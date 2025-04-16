/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AddCommande from "./addCommande";
import UpdateCommande from "./updateCommande";
import DeleteCommande from "./deleteCommande";
// import axios from "axios";

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const CommandesClient = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [commandes, setCommandes] = useState([]);
  const [clients, setClients] = useState([]);
  const [produits, setProduits] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 5;
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const status = searchParams.get("status") || "all";

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/commandes?page=${currentPage}&status=${status}`);
      const data = await res.json();

      setCommandes(data.commandes);
      setTotalPages(data.totalPages);
      setClients(data.clients);
      setProduits(data.produits);
    } catch (err) {
      console.error("Erreur lors du fetch des données :", err);
    }
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, status]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    router.push(`?status=${selected}&page=1`);
  };

  return (
    <div className="px-2 sm:px-4">
      <h1 className="text-xl sm:text-2xl font-bold text-center text-indigo-900 italic mt-4">LISTE DES COMMANDES</h1>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-4">
        <select
          onChange={handleStatusChange}
          defaultValue={status}
          className="px-3 py-2 border rounded w-full sm:w-auto"
        >
          <option value="all">Toutes</option>
          <option value="encours">En cours</option>
          <option value="realise">Réalisées</option>
        </select>
        
        <AddCommande 
        clients={clients} 
        produits={produits} 
        onUpdateList={fetchData}
        />
      </div>

      <div className="mt-6 bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-[800px] w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 font-bold">N°</th>
              <th className="p-3 font-bold">Produit</th>
              <th className="p-3 font-bold">Client</th>
              <th className="p-3 font-bold">Quantité</th>
              <th className="p-3 font-bold">Prix Unitaire</th>
              <th className="p-3 font-bold">Prix Total</th>
              <th className="p-3 font-bold">Date Comm</th>
              <th className="p-3 font-bold">Date Liv</th>
              <th className="p-3 font-bold">Comt</th>
              <th className="p-3 font-bold">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {commandes.map((commande: any, index: number) => (
              <tr key={commande.idCommande} className="border-t">
                <td className="p-3">{(currentPage - 1) * pageSize + index + 1}</td>
                <td className="p-3">{commande.produit?.libelle}</td>
                <td className="p-3">{commande.client?.prenom} {commande.client?.nom}</td>
                <td className="p-3">{commande.quantite}</td>
                <td className="p-3">{commande.prixUnitaire.toLocaleString()} FCFA</td>
                <td className="p-3 font-bold">{commande.quantite * commande.prixUnitaire} FCFA</td>
                <td className="p-3">{formatDate(commande.dateCommande)}</td>
                <td className="p-3">{formatDate(commande.dateLivraison)}</td>
                <td className="p-3">{commande.commentaire}</td>
                <td className="p-3 flex space-x-2">
                  <UpdateCommande clients={clients} produits={produits} commande={commande} onUpdateList={fetchData}/>
                  <DeleteCommande commande={commande} onUpdateList={fetchData}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
        <button
          onClick={() => router.push(`?status=${status}&page=${currentPage - 1}`)}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-gray-300 rounded ${currentPage === 1 ? "opacity-50 pointer-events-none" : ""}`}
        >
          Précédent
        </button>
        <span className="text-sm">Page {currentPage} / {totalPages}</span>
        <button
          onClick={() => router.push(`?status=${status}&page=${currentPage + 1}`)}
          disabled={currentPage >= totalPages}
          className={`px-4 py-2 bg-gray-300 rounded ${currentPage >= totalPages ? "opacity-50 pointer-events-none" : ""}`}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default CommandesClient;
