"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="relative w-full h-screen">
      {/* Image de fond */}
      <div className="absolute inset-0">
        <Image
          src="/background.jpg" // Remplace par ton image
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-10 py-4 bg-white bg-opacity-80 shadow-md z-50">
        {/* Logo */}
        <div className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={100} height={50} />
        </div>

        {/* Bouton Connexion */}
        <button
          onClick={() => router.push("/login")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-lg transition cursor-pointer"
        >
          Se connecter
        </button>
      </nav>

      {/* Contenu principal */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
        <h1 className="text-5xl font-bold mb-4">Bienvenue chez Perfect Group</h1>
        <p className="text-xl mb-6">Optimisez la gestion de vos commandes et dépenses.</p>

        {/* <button
          onClick={() => router.push("/dashboard")}
          className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg text-lg transition shadow-lg cursor-pointer"
        >
          Accéder au Dashboard
        </button> */}
      </div>
    </div>
  );
}
