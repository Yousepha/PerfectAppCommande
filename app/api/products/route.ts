import { NextResponse } from "next/server";
import type { Produit } from "@prisma/client";
import prisma from "@/app/lib/prisma";

export const POST = async (request: Request) =>{
    const body: Produit = await request.json();
    const produit = await prisma.produit.create({
        data:{
            libelle: body.libelle,
        }
    });
    return NextResponse.json(produit, {status: 201});
}