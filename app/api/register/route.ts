/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, password, prenom, nom } = await req.json();

    if (!email || !password || !prenom || !nom) {
      return NextResponse.json({ message: "Tous les champs sont requis" }, { status: 400 });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        prenom: prenom,
        nom: nom,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "User creation failed", error: error.message },
      { status: 500 }
    );
  }
}


export function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: { "Allow": "POST, OPTIONS" } });
}