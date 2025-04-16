import { NextResponse } from "next/server";
import type { Depense } from "@prisma/client";
import prisma from "@/app/lib/prisma";

export const POST = async (request: Request) =>{
    const body: Depense = await request.json();
    const depense = await prisma.depense.create({
        data:{
            libelle: body.libelle, 
            quantite: body.quantite, 
            prixUnitaire: body.prixUnitaire,
            dateDepense: new Date(body.dateDepense).toISOString(), 
            fournisseurId: body.fournisseurId
        }
    });
    return NextResponse.json(depense, {status: 201});
}