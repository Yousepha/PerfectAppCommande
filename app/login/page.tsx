/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // Ajoute ceci si tu es en App Router (Next.js 13+)

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Si Pages Router, utilise "next/router"

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Email ou mot de passe incorrect !");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token); // Stockage du token (optionnel)

      router.push("/dashboard"); // Redirection après connexion réussie
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/background.jpg')" }}>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        {/* Logo */}
                <div className="flex justify-center items-center">
                  <Image src="/logo.png" alt="Logo" width={100} height={50} />
                </div>
        <h2 className="text-2xl font-bold text-center mb-4">Connexion</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input 
              type="email" 
              className="w-full p-2 border rounded-lg" 
              placeholder="Entrez votre email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Mot de passe</label>
            <input 
              type="password" 
              className="w-full p-2 border rounded-lg" 
              placeholder="********" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg cursor-pointer"
            disabled={loading}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
