'use client';
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useState, useEffect } from "react";
import { useChat } from "ai/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, } from "@/components/ui/card";
import { Send, Bot, User, Upload, ShoppingBag, Sun, Moon } from "lucide-react";
import { generateId } from "ai";
var ChatMessage = function (_a) {
    var message = _a.message;
    return (<div className={"flex ".concat(message.role === 'assistant' ? 'justify-start' : 'justify-end', " mb-4")}>
    <div className={"flex items-start ".concat(message.role === 'assistant' ? 'flex-row' : 'flex-row-reverse')}>
      <div className={"rounded-full p-2 ".concat(message.role === 'assistant' ? 'bg-green-500' : 'bg-blue-500', " text-white shadow-lg")}>
        {message.role === 'assistant' ? <Bot size={24}/> : <User size={24}/>}
      </div>
      <div className={"mx-3 px-4 py-2 rounded-lg shadow-md ".concat(message.role === 'assistant'
            ? 'bg-white text-gray-800 dark:bg-gray-700 dark:text-white'
            : 'bg-blue-500 text-white')}>
        {message.content}
      </div>
    </div>
  </div>);
};
var ApothekaAIAssistant = function () {
    var _a = useState(false), isDarkMode = _a[0], setIsDarkMode = _a[1];
    var _b = useState([]), shoppingBag = _b[0], setShoppingBag = _b[1];
    var _c = useState({}), userHealth = _c[0], setUserHealth = _c[1];
    var _d = useChat({
        initialMessages: [
            {
                id: generateId(),
                role: "system",
                content: "E\u0219ti asistentul AI pentru lan\u021Bul de farmacii Apotheka din Rom\u00E2nia. Numele t\u0103u este ApothekaAI.\n\n        Personalitate \u0219i Ton:\n        - Ai o personalitate prietenoas\u0103 \u0219i empatic\u0103.\n        - Folose\u0219ti un ton cald \u0219i \u00EEncurajator, dar p\u0103strezi profesionalismul specific domeniului medical.\n        - \u00CEncurajezi \u00EEntotdeauna un stil de via\u021B\u0103 s\u0103n\u0103tos \u0219i ofer\u0103 sfaturi \u00EEn acest sens c\u00E2nd este posibil.\n\n        Cuno\u0219tin\u021Be Specializate:\n        - Ai informa\u021Bii detaliate despre toate produsele \u0219i serviciile oferite de Apotheka.\n        - Cuno\u0219ti regulamentele locale de s\u0103n\u0103tate \u0219i le respec\u021Bi \u00EEn recomand\u0103rile tale.\n        - E\u0219ti la curent cu promo\u021Biile curente \u0219i programele de fidelitate Apotheka.\n\n        Restric\u021Bii \u0219i Focalizare:\n        - R\u0103spunzi exclusiv \u00EEn limba rom\u00E2n\u0103.\n        - Te concentrezi doar pe subiecte legate de Apotheka, produse farmaceutice, s\u0103n\u0103tate \u0219i stil de via\u021B\u0103 s\u0103n\u0103tos.\n        - Pentru orice \u00EEntrebare \u00EEn afara acestor domenii, explici politicos c\u0103 po\u021Bi ajuta doar cu informa\u021Bii legate de farmacie \u0219i s\u0103n\u0103tate.\n\n        Sfaturi Personalizate:\n        - Ofer\u0103 sfaturi personalizate bazate pe informa\u021Biile de s\u0103n\u0103tate ale pacientului, dac\u0103 sunt disponibile.\n        - Promoveaz\u0103 un stil de via\u021B\u0103 s\u0103n\u0103tos, oferind sugestii adaptate situa\u021Biei fiec\u0103rui client.\n\n        Siguran\u021B\u0103 \u0219i Etic\u0103:\n        - Prioritizeaz\u0103 \u00EEntotdeauna siguran\u021Ba pacientului.\n        - Recomand\u0103 consultarea unui medic pentru diagnostice sau schimb\u0103ri \u00EEn tratament.\n        - Respect\u0103 confiden\u021Bialitatea datelor pacien\u021Bilor.\n\n        \u00CEncheiere:\n        - \u00CEncheie fiecare interac\u021Biune cu expresia \"S\u0103n\u0103tate \u0219i z\u00E2mbete de la Apotheka!\"",
            },
            {
                id: generateId(),
                role: "assistant",
                content: "Bună ziua și bine ați venit la Apotheka! Sunt ApothekaAI, asistentul dumneavoastră virtual. Cu ce vă pot ajuta astăzi?",
            },
        ],
    }), messages = _d.messages, input = _d.input, handleInputChange = _d.handleInputChange, handleSubmit = _d.handleSubmit, setMessages = _d.setMessages;
    useEffect(function () {
        var savedMode = localStorage.getItem('darkMode');
        if (savedMode) {
            setIsDarkMode(JSON.parse(savedMode));
        }
    }, []);
    useEffect(function () {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        }
        else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    }, [isDarkMode]);
    var handleApothekaSubmit = function (e) {
        e.preventDefault();
        var userMessage = input.trim();
        var nonPharmacyKeywords = [
            "vreme",
            "sport",
            "politică",
            "film",
            "muzică",
            "călătorie",
        ];
        if (nonPharmacyKeywords.some(function (keyword) {
            return userMessage.toLowerCase().includes(keyword);
        })) {
            var newUserMessage = {
                id: generateId(),
                role: "user",
                content: userMessage,
            };
            var newAssistantMessage = {
                id: generateId(),
                role: "assistant",
                content: "Îmi cer scuze, dar pot asista doar cu întrebări legate de produsele și serviciile Apotheka, farmacie și sănătate. Dacă aveți întrebări despre medicamente, sfaturi de sănătate sau alte subiecte legate de Apotheka, vă pot ajuta cu plăcere! Sănătate și zâmbete de la Apotheka!",
            };
            setMessages(__spreadArray(__spreadArray([], messages, true), [newUserMessage, newAssistantMessage], false));
            return;
        }
        handleSubmit(e);
    };
    var handleFileUpload = function (event) {
        var _a;
        var file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            setShoppingBag(__spreadArray(__spreadArray([], shoppingBag, true), [{ name: "Medicament din rețetă", quantity: 1 }], false));
            var newUserMessage = {
                id: generateId(),
                role: "user",
                content: "Am încărcat o rețetă.",
            };
            var newAssistantMessage = {
                id: generateId(),
                role: "assistant",
                content: "Am procesat rețeta dumneavoastră și am adăugat medicamentul în coșul de cumpărături. Doriți să revizuiți comanda sau aveți întrebări despre medicament? Sănătate și zâmbete de la Apotheka!",
            };
            setMessages(__spreadArray(__spreadArray([], messages, true), [newUserMessage, newAssistantMessage], false));
        }
    };
    var toggleDarkMode = function () {
        setIsDarkMode(!isDarkMode);
    };
    return (<div className={"flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200"}>
      <Card className="w-full max-w-4xl m-auto shadow-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-6">
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl font-bold">Apotheka AI Assistant</CardTitle>
            <Button variant="outline" size="icon" onClick={toggleDarkMode} className="rounded-full">
              {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]"/> : <Moon className="h-[1.2rem] w-[1.2rem]"/>}
            </Button>
          </div>
        </CardHeader>
        <CardContent className={"p-0 flex flex-col h-[600px] bg-white dark:bg-gray-800"}>
          <ScrollArea className="flex-grow p-6">
            {messages.filter(function (msg) { return msg.role !== 'system'; }).map(function (msg) { return (<ChatMessage key={msg.id} message={msg}/>); })}
          </ScrollArea>
          <div className="w-64 p-4 bg-gray-200 dark:bg-gray-700">
            <h3 className="font-bold mb-2 dark:text-white">Coș de cumpărături</h3>
            {shoppingBag.map(function (item, index) { return (<div key={index} className="dark:text-gray-200">{item.name} x{item.quantity}</div>); })}
          </div>
        </CardContent>
        <CardFooter className={"p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700"}>
          <form onSubmit={handleApothekaSubmit} className="flex w-full space-x-2">
            <Input type="text" placeholder="Întrebați-mă despre produsele Apotheka..." value={input} onChange={handleInputChange} className={"flex-grow bg-gray-100 dark:bg-gray-700 dark:text-white"}/>
            <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">
              <Send size={18}/>
            </Button>
            <label className="cursor-pointer">
              <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*"/>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                <Upload size={18}/>
              </Button>
            </label>
            <Button className="bg-purple-500 hover:bg-purple-600 text-white">
              <ShoppingBag size={18}/>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>);
};
export default ApothekaAIAssistant;
