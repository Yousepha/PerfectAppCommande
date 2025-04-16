import prisma from "@/app/lib/prisma";
import Link from "next/link";
import DeleteClient from "./deleteClient";
import UpdateClient from "./updateClient";
import AddClient from "./addClient";

const getClients = async (page: number, pageSize: number) => {
  const totalCount = await prisma.client.count();
  const clients = await prisma.client.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    select: {
      idClient: true,
      prenom: true,
      nom: true,
      adresse: true,
      telephone: true,
      entreprise: true,
    },
  });

  return { clients, totalPages: Math.ceil(totalCount / pageSize) };
};


const ClientsPage = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const pageSize = 5; // Nombre d'éléments par page
  const page = parseInt(searchParams.page || "1", 10); // Convertir le paramètre en nombre
  const { clients, totalPages } = await getClients(page, pageSize);

  return (
    <div>
      {/* Titre */}
      <h1 className="text-2xl font-bold text-center text-indigo-900 italic">LISTE DES CLIENTS</h1>
      <AddClient />

      {/* Tableau des dépenses */}
      <div className="mt-6 bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 font-bold">N°</th>
              <th className="p-3 font-bold">Prenom</th>
              <th className="p-3 font-bold">Nom</th>
              <th className="p-3 font-bold">Adresse</th>
              <th className="p-3 font-bold">Téléphone</th>
              <th className="p-3 font-bold">Entreprise</th>
              <th className="p-3 font-bold">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <tr key={client.idClient} className="border-t">
                <td className="p-3">{(page - 1) * pageSize + index + 1}</td>
                <td className="p-3">{client.nom}</td>
                <td className="p-3">{client.prenom}</td>
                <td className="p-3">{client.adresse}</td>
                <td className="p-3">{client.telephone}</td>
                <td className="p-3">{client.entreprise}</td>
                <td className="p-3 flex space-x-2">
                  <UpdateClient  client={client} />
                  <DeleteClient client={client} />
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

export default ClientsPage;