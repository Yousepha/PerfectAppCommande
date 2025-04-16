/*
  Warnings:

  - You are about to drop the column `prixUnitaire` on the `Produit` table. All the data in the column will be lost.
  - You are about to drop the column `quantite` on the `Produit` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `Commande` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateDepense` to the `Depense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adresse` to the `Fournisseur` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "entreprise" TEXT;

-- AlterTable
ALTER TABLE "Commande" ADD COLUMN     "clientId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Depense" ADD COLUMN     "dateDepense" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Fournisseur" ADD COLUMN     "adresse" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Produit" DROP COLUMN "prixUnitaire",
DROP COLUMN "quantite";

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "bio" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("idClient") ON DELETE RESTRICT ON UPDATE CASCADE;
