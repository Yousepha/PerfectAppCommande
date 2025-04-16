import { NextResponse } from "next/server";
import type { Fournisseur } from "@prisma/client";
import prisma from "@/app/lib/prisma";

export const POST = async (request: Request) =>{
    const body: Fournisseur = await request.json();
    const fournisseur = await prisma.fournisseur.create({
        data:{
            nom: body.nom,
            adresse: body.adresse,
        }
    });
    return NextResponse.json(fournisseur, {status: 201});
}