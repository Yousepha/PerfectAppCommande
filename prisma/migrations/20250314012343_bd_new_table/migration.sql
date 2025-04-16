/*
  Warnings:

  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - Added the required column `nom` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prenom` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "id",
ADD COLUMN     "idUser" SERIAL NOT NULL,
ADD COLUMN     "nom" TEXT NOT NULL,
ADD COLUMN     "prenom" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("idUser");

-- CreateTable
CREATE TABLE "Client" (
    "idClient" SERIAL NOT NULL,
    "prenom" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("idClient")
);

-- CreateTable
CREATE TABLE "Commande" (
    "idCommande" SERIAL NOT NULL,
    "quantite" DOUBLE PRECISION NOT NULL,
    "prixUnitaire" DOUBLE PRECISION NOT NULL,
    "prixTotal" DOUBLE PRECISION NOT NULL,
    "dateCommande" TIMESTAMP(3) NOT NULL,
    "dateLivraison" TIMESTAMP(3) NOT NULL,
    "commentaire" TEXT,
    "UserId" INTEGER NOT NULL,
    "produitId" INTEGER NOT NULL,

    CONSTRAINT "Commande_pkey" PRIMARY KEY ("idCommande")
);

-- CreateTable
CREATE TABLE "Produit" (
    "idProduit" SERIAL NOT NULL,
    "libelle" TEXT NOT NULL,
    "prixUnitaire" DOUBLE PRECISION NOT NULL,
    "quantite" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Produit_pkey" PRIMARY KEY ("idProduit")
);

-- CreateTable
CREATE TABLE "Depense" (
    "idDepense" SERIAL NOT NULL,
    "libelle" TEXT NOT NULL,
    "quantite" DOUBLE PRECISION NOT NULL,
    "prixUnitaire" DOUBLE PRECISION NOT NULL,
    "fournisseurId" INTEGER NOT NULL,

    CONSTRAINT "Depense_pkey" PRIMARY KEY ("idDepense")
);

-- CreateTable
CREATE TABLE "Fournisseur" (
    "idFournisseur" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "Fournisseur_pkey" PRIMARY KEY ("idFournisseur")
);

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "Produit"("idProduit") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Depense" ADD CONSTRAINT "Depense_fournisseurId_fkey" FOREIGN KEY ("fournisseurId") REFERENCES "Fournisseur"("idFournisseur") ON DELETE RESTRICT ON UPDATE CASCADE;
