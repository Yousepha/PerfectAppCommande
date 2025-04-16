import prisma from "@/app/lib/prisma";
import AddDepense from "./addDepense";
import UpdateDepense from "./updateDepense";
import DeleteDepense from "./deleteDepense";
import Link from "next/link";

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const getDepenses = async (page: number, pageSize: number) => {
  const totalCount = await prisma.depense.count();
  const depenses = await prisma.depense.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    select: {
      idDepense: true,
      libelle: true,
      quantite: true,
      dateDepense: true,
      prixUnitaire: true,
      fournisseurId: true,
      fournisseur: true,
    },
  });

  return { depenses, totalPages: Math.ceil(totalCount / pageSize) };
};

const getFournisseurs = async () => {
  return await prisma.fournisseur.findMany();
};

const DepensesPage = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const pageSize = 5; // Nombre d'éléments par page
  const page = parseInt(searchParams.page || "1", 10); // Convertir le paramètre en nombre
  const { depenses, totalPages } = await getDepenses(page, pageSize);
  const fournisseurs = await getFournisseurs();

  return (
    <div>
      {/* Titre */}
      <h1 className="text-2xl font-bold text-center text-indigo-900 italic">LISTE DES DÉPENSES</h1>
      <AddDepense fournisseurs={fournisseurs} />

      {/* Tableau des dépenses */}
      <div className="mt-6 bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 font-bold">N°</th>
              <th className="p-3 font-bold">Libellé</th>
              <th className="p-3 font-bold">Quantité</th>
              <th className="p-3 font-bold">Prix Unitaire</th>
              <th className="p-3 font-bold">Prix Total</th> 
              <th className="p-3 font-bold">Date Dépense</th> 
              <th className="p-3 font-bold">Fournisseur</th>
              <th className="p-3 font-bold">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {depenses.map((depense, index) => (
              <tr key={depense.idDepense} className="border-t">
                <td className="p-3">{(page - 1) * pageSize + index + 1}</td>
                <td className="p-3">{depense.libelle}</td>
                <td className="p-3">{depense.quantite}</td>
                <td className="p-3">{depense.prixUnitaire.toLocaleString()} FCFA</td>
                <td className="p-3 font-bold">{depense.quantite * depense.prixUnitaire} FCFA</td>
                <td className="p-3">{formatDate(depense.dateDepense.toString())}</td>
                <td className="p-3">{depense.fournisseur?.nom}</td>
                <td className="p-3 flex space-x-2">
                  <UpdateDepense fournisseurs={fournisseurs} depense={depense} />
                  <DeleteDepense depense={depense} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <Link
          href={`?page=${page - 1}`}
          className={`px-4 py-2 bg-gray-300 rounded ${page === 1 ? "opacity-50 pointer-events-none" : ""}`}
        >
          Précédent
        </Link>
        <span className="px-4 py-2">Page {page} / {totalPages}</span>
        <Link
          href={`?page=${page + 1}`}
          className={`px-4 py-2 bg-gray-300 rounded ${page >= totalPages ? "opacity-50 pointer-events-none" : ""}`}
        >
          Suivant
        </Link>
      </div>
    </div>
  );
};

export default DepensesPage;
