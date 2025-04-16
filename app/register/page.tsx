"use client";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Register() {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [prenom, setPrenom] = useState('');
	const [nom, setNom] = useState('');
    const router = useRouter();
    const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post('/api/register', {email, password, prenom, nom})
            router.push('/login')
        } catch (error) {
            console.error('Registration falled', error);
        }
    }

    return(
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/background.jpg')" }}>
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            {/* Logo */}
                    <div className="flex justify-center items-center">
                        <Image src="/logo.png" alt="Logo" width={100} height={50} />
                    </div>
            <h2 className="text-2xl font-bold text-center mb-4">Inscription</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                <label className="block text-gray-700">Prénom</label>
                <input 
                    type="text" 
                    className="w-full p-2 border rounded-lg" 
                    placeholder="Entrez votre prénom" 
                    value={prenom} 
                    onChange={(e) => setPrenom(e.target.value)} 
                    required
                />
                </div>
                <div className="mb-4">
                <label className="block text-gray-700">Nom</label>
                <input 
                    type="text" 
                    className="w-full p-2 border rounded-lg" 
                    placeholder="Entrez votre nom" 
                    value={nom} 
                    onChange={(e) => setNom(e.target.value)} 
                    required
                />
                </div>
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
                {loading ? "Inscription..." : "S'inscrire"}
                </button>
            </form>
            </div>
        </div>
    )
}