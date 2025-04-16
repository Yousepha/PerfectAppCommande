import { NextResponse } from "next/server";
import type { Fournisseur } from "@prisma/client";
import prisma from "@/app/lib/prisma";

export const PATCH = async (request: Request, {params}: {params: {id: string}}) =>{
    const body: Fournisseur = await request.json();
    const fournisseur = await prisma.fournisseur.update({
        where:{
            idFournisseur: Number(params.id)
        },
        data:{
            nom: body.nom,
            adresse: body.adresse,        }
    });
    return NextResponse.json(fournisseur, {status: 200});
}

export const DELETE = async (request: Request, {params}: {params: {id: string}}) =>{
    const fournisseur = await prisma.fournisseur.delete({
        where:{
            idFournisseur: Number(params.id)
        }
    });
    return NextResponse.json(fournisseur, {status: 200});
}