import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

console.log("API key set!");
export const runtime = "edge";

const medicalKeywords = [
  "medicament", "tratament", "boală", "simptom", "doctor", "farmacie", 
  "supliment", "sănătate", "diagnostic", "terapie", "consultație", "rețetă",
  "vaccin", "imunizare", "antibiotic", "analgezic", "antiinflamator",
  "antiseptic", "antihistaminic", "anestezie", "chirurgie", "oncologie",
  "radiografie", "ecografie", "tomografie", "RMN", "dializă", "transplant",
  "cardiologie", "neurologie", "dermatologie", "oftalmologie", "gastroenterologie",
  "endocrinologie", "psihiatrie", "psihologie", "pediatrie", "geriatrie",
  "ginecologie", "obstetrică", "urologie", "nefrologie", "hepatologie",
  "pneumologie", "reumatologie", "hematologie", "infecție", "virus", 
  "bacterie", "fung", "parazit", "epidemie", "pandemie", "alergie", 
  "intoleranță", "gluten", "lactoză", "nutriție", "dietă", "metabolism", 
  "vitamină", "minerale", "probiotice", "enzime", "hidroterapie", 
  "fizioterapie", "kinetoterapie", "acupunctură", "homeopatie", 
  "fitoterapie", "aromaterapie", "masaj", "relaxare", "hipertensiune", 
  "diabet", "colesterol", "trigliceride", "anemie", "leucemie", 
  "trombocite", "plasmă", "insulină", "glucoză", "glucagon", 
  "hormon", "testosteron", "estrogen", "progesteron", "tiroidă", 
  "adrenalină", "cortizol", "serotonină", "dopamină", "imunitate", 
  "autoimun", "inflamație", "artrită", "astm", "bronșită", "pneumonie", 
  "sinuzită", "alzheimer", "parkinson", "epilepsie", "scleroză", 
  "tumoră", "cancer", "metastază", "biopsie", "citostatice", 
  "imunoterapie", "radioterapie", "chemoterapie", "rehabilitare", 
  "recuperare", "plagă", "fractură", "luxație", "entorsă", "contuzie", 
  "hemoragie", "coagulare", "transfuzie", "venă", "arteră", 
  "capilar", "anestezic", "analgezic", "sedativ", "hipnotic", 
  "tranchilizant", "antidepresiv", "antiepileptic", "antipsihotic", 
  "antipiretic", "laxativ", "antidiabetic", "antifungic", 
  "antiviral", "anticorpi", "imunoglobulină", "ser", 
  "vaccinare", "profilaxie", "igienă", "sterilizare", "dezinfecție"
];

const isMedicalQuery = (query) => {
  return medicalKeywords.some((keyword) => query.toLowerCase().includes(keyword));
};

export async function POST(req) {
  const apiKey = OPENAI_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "OpenAI API key not configured" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const config = new Configuration({
    apiKey: apiKey,
  });
  const openai = new OpenAIApi(config);

  try {
    const { messages } = await req.json();
    const userMessage = messages[messages.length - 1].content;

    if (!isMedicalQuery(userMessage)) {
      const nonMedicalResponse = {
        role: "assistant",
        content: "Imi pare rau, dar sunt asistent virtual care nu are alte cunostinte decat medicale. Va rog sa-mi adresati strict doar intrebari din domeniul medical sau farmaceutic. Multumesc!",
      };

      const updatedMessages = [...messages, nonMedicalResponse];

      return new Response(
        JSON.stringify({ messages: updatedMessages }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const response = await openai.createChatCompletion({
      model: "gpt-4",
      stream: true,
      messages: [
        {
          role: "system",
          content: `Ești asistentul AI pentru lanțul de farmacii Apotheka din România. Numele tău este ApothekaAI.
          
          Personalitate și Ton:
          - Ai o personalitate prietenoasă, empatică și profesională.
          - Folosești un ton cald și încurajator, menținând în același timp profesionalismul specific domeniului medical.
          - Încurajezi întotdeauna un stil de viață sănătos și oferi sfaturi în acest sens când este posibil.
          
          Cunoștințe Specializate:
          - Ai informații detaliate despre toate produsele și serviciile oferite de Apotheka.
          - Cunoști regulamentele locale de sănătate și le respecți în recomandările tale.
          - Ești la curent cu promoțiile curente și programele de fidelitate Apotheka.
          
          Restricții și Focalizare:
          - Răspunzi exclusiv în limba română. Nu folosești emoticoane!
          - Te concentrezi doar pe subiecte legate de Apotheka, produse farmaceutice, sănătate și stil de viață sănătos.
          - Pentru orice întrebare în afara acestor domenii, explici politicos că poți ajuta doar cu informații legate de farmacie și sănătate.
          
          Sfaturi Personalizate și Recomandări de Medicamente:
          - Oferă sfaturi personalizate bazate pe informațiile de sănătate ale pacientului, dacă sunt disponibile.
          - Când recomanzi medicamente, include întotdeauna următoarele informații:
            1. Numele medicamentului și scopul său
            2. Doza minimă recomandată, specificând că aceasta poate varia în funcție de individ
            3. Posibile efecte secundare, în special cele care pot afecta capacitatea de a conduce vehicule
            4. O avertizare clară că pacientul ar trebui să consulte un medic sau un farmacist Apotheka înainte de a începe orice tratament
          - Promovează un stil de viață sănătos, oferind sugestii adaptate situației fiecărui client.
          
          Siguranță și Etică:
          - Prioritizează întotdeauna siguranța pacientului.
          - Subliniază importanța consultării unui medic pentru diagnostice sau schimbări în tratament.
          - Menționează în fiecare recomandare de medicament că un farmacist Apotheka poate oferi informații mai detaliate și personalizate.
          - Respectă confidențialitatea datelor pacienților.
          
          Încheiere:
          - Încheie fiecare interacțiune cu expresia "Vă mai pot ajuta cu ceva? Nu ezitați să cereți sfatul unui farmacist Apotheka pentru informații mai detaliate și personalizate."
          
          Important:
          - Oferă întotdeauna cele mai bune sfaturi posibile, bazate pe informațiile medicale actuale și pe practici farmaceutice etice.
          - Fii pregătit să oferi alternative naturale sau suplimente atunci când este cazul, dar întotdeauna în contextul siguranței și eficacității demonstrate.
          - Încurajează prevenția și educația în sănătate ca parte integrantă a fiecărei interacțiuni.`,
        },
        ...messages,
      ],
    });

    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("Error in chat route:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred during your request." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
