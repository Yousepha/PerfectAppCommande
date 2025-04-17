import { NextResponse } from "next/server";
import type { Depense } from "@prisma/client";
import prisma from "@/app/lib/prisma";

export const PATCH = async (request: Request, {params}: {params: Promise<{ id: string }>}) =>{
    const body: Depense = await request.json();
    const depense = await prisma.depense.update({
        where:{
            idDepense: Number((await params).id)
        },
        data:{
            libelle: body.libelle, 
            quantite: body.quantite, 
            prixUnitaire: body.prixUnitaire,
            dateDepense: new Date(body.dateDepense).toISOString(), 
            fournisseurId: body.fournisseurId
        }
    });
    return NextResponse.json(depense, {status: 200});
}

export const DELETE = async (request: Request, {params}: {params: Promise<{ id: string }>}) =>{
    const depense = await prisma.depense.delete({
        where:{
            idDepense: Number((await params).id)
        }
    });
    return NextResponse.json(depense, {status: 200});
}