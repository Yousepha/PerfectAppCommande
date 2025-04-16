/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email et mot de passe requis" }, { status: 400 });
    }

     // Récupérer l'utilisateur avec son profil
     const user = await prisma.user.findUnique({
      where: { email },
      include: { profile: true }, // Inclure le profil
    });

    // const user = await prisma.user.findUnique({
    //   where: { email },
    // });

    if (!user || !user.password) {
      return NextResponse.json({ message: "Utilisateur non trouvé" }, { status: 401 });
    }

    // Vérifier si l'utilisateur existe et si le mot de passe est correct
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ message: "Email ou mot de passe invalide" }, { status: 401 });
    }

    if (!process.env.JWT_SECRET) {
      return NextResponse.json({ message: "Erreur serveur : JWT_SECRET manquant" }, { status: 500 });
    }

    // Extraire le rôle depuis le profil (bio)
    const role = user.profile?.bio || "ASSISTANT"; // Valeur par défaut si pas défini
    console.log(role);
    // Générer un token JWT
    const token = jwt.sign(
      { id: user.idUser, email: user.email, role: role, prenom: user.prenom, nom: user.nom},
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Retourner le token et le rôle
    return NextResponse.json({ token, role }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Erreur interne du serveur" }, { status: 500 });
  }
}

export function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: { "Allow": "POST, OPTIONS" } });
}
