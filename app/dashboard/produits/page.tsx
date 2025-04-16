import prisma from "@/app/lib/prisma";
import Link from "next/link";
import AddProduct from "./addProduct";
import UpdateProduit from "./updateProduct";
import DeleteProduit from "./deleteProduct";

const getProducts = async (page: number, pageSize: number) => {
  const totalCount = await prisma.produit.count();
  const produits = await prisma.produit.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    select: {
      idProduit: true,
      libelle: true,
    },
  });

  return { produits, totalPages: Math.ceil(totalCount / pageSize) };
};


const ProduitsPage = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const pageSize = 5; // Nombre d'éléments par page
  const page = parseInt(searchParams.page || "1", 10); // Convertir le paramètre en nombre
  const { produits, totalPages } = await getProducts(page, pageSize);

  return (
    <div>
      {/* Titre */}
      <h1 className="text-2xl font-bold text-center text-indigo-900 italic">LISTE DES PRODUITS</h1>
      <AddProduct />

      {/* Tableau des dépenses */}
      <div className="mt-6 bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 font-bold">N°</th>
              <th className="p-3 font-bold">Libellé</th>
              <th className="p-3 font-bold">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {produits.map((produit, index) => (
              <tr key={produit.idProduit} className="border-t">
                <td className="p-3">{(page - 1) * pageSize + index + 1}</td>
                <td className="p-3">{produit.libelle}</td>
                <td className="p-3 flex space-x-2">
                  <UpdateProduit  produit={produit} />
                  <DeleteProduit produit={produit} />
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

export default ProduitsPage;

