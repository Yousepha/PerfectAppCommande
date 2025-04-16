/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import type { Commande } from "@prisma/client";
import prisma from "@/app/lib/prisma";

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    try {
      const url = new URL(request.url);
      const page = parseInt(url.searchParams.get("page") || "1", 10);
      const pageSize = 5;
      const status = url.searchParams.get("status") || "all";
      const now = new Date();
  
      const body: Commande = await request.json();
  
      // ✅ Mise à jour de la commande
      await prisma.commande.update({
        where: {
          idCommande: Number(params.id),
        },
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
  
      // 🔄 Recalcul du filtre après modification
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
      }, { status: 200 });
    } catch (error) {
      console.error("Erreur PATCH /api/commandes/[id] :", error);
      return NextResponse.json(
        { error: "Erreur lors de la mise à jour de la commande" },
        { status: 500 }
      );
    }
  };
  

// export const PATCH = async (request: Request, {params}: {params: {id: string}}) =>{
//     const body: Commande = await request.json();
//     const commande = await prisma.commande.update({
//         where:{
//             idCommande: Number(params.id)
//         },
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
//     return NextResponse.json(commande, {status: 200});
// }

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    try {
      const url = new URL(request.url);
      const page = parseInt(url.searchParams.get("page") || "1", 10);
      const pageSize = 5;
      const status = url.searchParams.get("status") || "all";
      const now = new Date();
  
      // 🗑️ Suppression de la commande
      await prisma.commande.delete({
        where: {
          idCommande: Number(params.id),
        },
      });
  
      // 🎯 Recalcul du filtre après suppression
      const where: any = {};
      if (status === "realise") {
        where.dateLivraison = { lte: now };
      } else if (status === "encours") {
        where.dateLivraison = { gt: now };
      }
  
      const totalCount = await prisma.commande.count({ where });
  
      // ✅ Vérifie si la page courante est encore valide après suppression
      const totalPages = Math.ceil(totalCount / pageSize);
      const correctedPage = page > totalPages ? totalPages : page;
  
      const commandes = await prisma.commande.findMany({
        where,
        skip: (correctedPage - 1) * pageSize,
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
  
      return NextResponse.json(
        {
          commandes,
          totalPages,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Erreur DELETE /api/commandes/[id] :", error);
      return NextResponse.json(
        { error: "Erreur lors de la suppression de la commande" },
        { status: 500 }
      );
    }
  };


// export const DELETE = async (request: Request, {params}: {params: {id: string}}) =>{
//     const commande = await prisma.commande.delete({
//         where:{
//             idCommande: Number(params.id)
//         }
//     });
//     return NextResponse.json(commande, {status: 200});
// }