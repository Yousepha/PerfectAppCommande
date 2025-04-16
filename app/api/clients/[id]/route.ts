import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

// 👇 Important si tu veux forcer Node.js au lieu de Edge Runtime
export const runtime = "nodejs";

type Params = {
  params: {
    id: string;
  };
};

export async function PATCH(
  request: Request,
  { params }: Params
) {
  const body = await request.json();

  const client = await prisma.client.update({
    where: {
      idClient: Number(params.id),
    },
    data: {
      prenom: body.prenom,
      nom: body.nom,
      adresse: body.adresse,
      telephone: body.telephone,
      entreprise: body.entreprise,
    },
  });

  return NextResponse.json(client);
}

export async function DELETE(
  request: Request,
  { params }: Params
) {
  const client = await prisma.client.delete({
    where: {
      idClient: Number(params.id),
    },
  });

  return NextResponse.json(client);
}




// import { NextResponse } from "next/server";
// import type { Client } from "@prisma/client";
// import prisma from "@/app/lib/prisma";

// export const PATCH = async (request: Request, {params}: {params: {id: string}}) =>{
//     const body: Client = await request.json();
//     const client = await prisma.client.update({
//         where:{
//             idClient: Number(params.id)
//         },
//         data:{
//             prenom: body.prenom,
//             nom: body.nom,
//             adresse: body.adresse,
//             telephone: body.telephone,
//             entreprise: body.entreprise
//         }
//     });
//     return NextResponse.json(client, {status: 200});
// }

// export const DELETE = async (request: Request, {params}: {params: {id: string}}) =>{
//     const client = await prisma.client.delete({
//         where:{
//             idClient: Number(params.id)
//         }
//     });
//     return NextResponse.json(client, {status: 200});
// }