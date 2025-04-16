import { NextResponse } from "next/server";
import type { Client } from "@prisma/client";
import prisma from "@/app/lib/prisma";

export const POST = async (request: Request) =>{
    const body: Client = await request.json();
    const client = await prisma.client.create({
        data:{
            prenom: body.prenom,
            nom: body.nom,
            adresse: body.adresse,
            telephone: body.telephone,
            entreprise: body.entreprise,
        }
    });
    return NextResponse.json(client, {status: 201});
}