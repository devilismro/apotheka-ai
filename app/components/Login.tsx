'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Hero from "../hero/Hero";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (email === "admin@apotheka.ro" && password === "test123") {
        setIsLoggedIn(true);
        setError("");
        router.push("/hero"); 
      } else {
        setError("Invalid email or password");
        setLoading(false);
      }
    }, 3000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-800">
      <Card className="max-w-sm w-full">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-gray-800 dark:text-white">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="flex flex-col space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="email">Email</label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="password">Password</label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <Button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
