/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import type { Commande } from "@prisma/client";

// 📌 GET : Commandes avec filtre + pagination
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = 5;
    const status = searchParams.get("status") || "all";

    const now = new Date();
    const where: any = {};

    if (status === "realise") {
      where.dateLivraison = { lte: now };
    } else if (status === "encours") {
      where.dateLivraison = { gt: now };
    }

    const totalCount = await prisma.commande.count({ where });

    const commandes = await prisma.commande.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        dateCommande: "desc",
      },
      select: {
        idCommande: true,
        quantite: true,
        prixUnitaire: true,
        dateCommande: true,
        dateLivraison: true,
        commentaire: true,
        UserId: true,
        User: true,
        clientId: true,
        client: true,
        produitId: true,
        produit: true,
      },
    });

    const clients = await prisma.client.findMany();
    const produits = await prisma.produit.findMany();

    return NextResponse.json({
      commandes,
      totalPages: Math.ceil(totalCount / pageSize),
      clients,
      produits,
    });
  } catch (error) {
    console.error("Erreur GET /api/commandes :", error);
    return NextResponse.json({ error: "Erreur lors du chargement des commandes" }, { status: 500 });
  }
}

// ✅ POST : Ajout d'une commande + renvoi des commandes mises à jour
export async function POST(request: Request) {
    try {
      const url = new URL(request.url);
      const page = parseInt(url.searchParams.get("page") || "1", 10);
      const pageSize = 5;
      const status = url.searchParams.get("status") || "all";
      const now = new Date();
  
      const body: Commande = await request.json();
  
      // Création de la commande
      await prisma.commande.create({
        data: {
          quantite: body.quantite,
          prixUnitaire: body.prixUnitaire,
          dateCommande: new Date(body.dateCommande).toISOString(),
          dateLivraison: new Date(body.dateLivraison).toISOString(),
          commentaire: body.commentaire,
          UserId: body.UserId,
          clientId: body.clientId,
          produitId: body.produitId,
        },
      });
  
      // 🎯 Recalcul du filtre après ajout
      const where: any = {};
      if (status === "realise") {
        where.dateLivraison = { lte: now };
      } else if (status === "encours") {
        where.dateLivraison = { gt: now };
      }
  
      const totalCount = await prisma.commande.count({ where });
  
      const commandes = await prisma.commande.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { dateCommande: "desc" },
        select: {
          idCommande: true,
          quantite: true,
          prixUnitaire: true,
          dateCommande: true,
          dateLivraison: true,
          commentaire: true,
          UserId: true,
          User: true,
          clientId: true,
          client: true,
          produitId: true,
          produit: true,
        },
      });
  
      return NextResponse.json({
        commandes,
        totalPages: Math.ceil(totalCount / pageSize),
      }, { status: 201 });
  
    } catch (error) {
      console.error("Erreur POST /api/commandes :", error);
      return NextResponse.json(
        { error: "Erreur lors de la création de la commande" },
        { status: 500 }
      );
    }
  }
  

// ✅ POST : Ajout d'une commande
// export async function POST(request: Request) {
//   try {
//     const body: Commande = await request.json();

//     const commande = await prisma.commande.create({
//       data: {
//         quantite: body.quantite,
//         prixUnitaire: body.prixUnitaire,
//         dateCommande: new Date(body.dateCommande).toISOString(),
//         dateLivraison: new Date(body.dateLivraison).toISOString(),
//         commentaire: body.commentaire,
//         UserId: body.UserId,
//         clientId: body.clientId,
//         produitId: body.produitId,
//       },
//     });

//     return NextResponse.json(commande, { status: 201 });
//   } catch (error) {
//     console.error("Erreur POST /api/commandes :", error);
//     return NextResponse.json({ error: "Erreur lors de la création de la commande" }, { status: 500 });
//   }
// }



// import { NextResponse } from "next/server";
// import type { Commande } from "@prisma/client";
// import prisma from "@/app/lib/prisma";

// export const POST = async (request: Request) =>{
//     const body: Commande = await request.json();
//     const commande = await prisma.commande.create({
//         data:{
//             quantite: body.quantite, 
//             prixUnitaire: body.prixUnitaire,
//             dateCommande: new Date(body.dateCommande).toISOString(), 
//             dateLivraison: new Date(body.dateLivraison).toISOString(), 
//             commentaire: body.commentaire, 
//             UserId: body.UserId,
//             clientId: body.clientId,
//             produitId: body.produitId
//         }
//     });
//     return NextResponse.json(commande, {status: 201});
// }