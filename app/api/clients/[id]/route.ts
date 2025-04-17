import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "@/app/lib/prisma";

export const runtime = 'nodejs'; // 👈 Important pour éviter Edge Runtime

// PATCH client
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await request.json();

  const client = await prisma.client.update({
    where: {
      idClient: Number((await params).id),
    },
    data: {
      prenom: body.prenom,
      nom: body.nom,
      adresse: body.adresse,
      telephone: body.telephone,
      entreprise: body.entreprise,
    },
  });

  return NextResponse.json(client, { status: 200 });
}

// DELETE client
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }>}
) {
    
  const client = await prisma.client.delete({
    where: {
      idClient: Number((await params).id),
    },
  });

  return NextResponse.json(client, { status: 200 });
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