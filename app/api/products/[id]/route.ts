import { NextResponse } from "next/server";
import type { Produit } from "@prisma/client";
import prisma from "@/app/lib/prisma";

export const PATCH = async (request: Request, {params}: {params: Promise<{ id: string }>}) =>{
    const body: Produit = await request.json();
    const produit = await prisma.produit.update({
        where:{
            idProduit: Number((await params).id)
        },
        data:{
            libelle: body.libelle,
        }
    });
    return NextResponse.json(produit, {status: 200});
}

export const DELETE = async (request: Request, {params}: {params: Promise<{ id: string }>}) =>{
    const produit = await prisma.produit.delete({
        where:{
            idProduit: Number((await params).id)
        }
    });
    return NextResponse.json(produit, {status: 200});
}