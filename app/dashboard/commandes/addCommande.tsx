/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, SyntheticEvent } from "react";
import type { Client } from "@prisma/client";
import type { Produit } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";
import Modal from "../Modal";
import { FaPlus } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

const AddCommande = (
    { clients, produits, onUpdateList }: { clients: Client[]; produits: Produit[];onUpdateList?: (commandes: any[]) => void; }) => {
    const searchParams = useSearchParams();
    const status = searchParams.get("status") || "all";
    const page = searchParams.get("page") || "1";
  
    const [quantite, setQuantite] = useState(""); 
    const [prixUnitaire, setPrixUnitaire] = useState("");
    const [dateCommande, setDateCommande] = useState(""); 
    const [dateLivraison, setDateLivraison] = useState("");
    const [commentaire, setCommentaire] = useState("");
    const [User, setUser] = useState("1");
    const [client, setClient] = useState("");
    const [produit, setProduit] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `/api/commandes?page=${page}&status=${status}`,
        {
          quantite: Number(quantite),
          prixUnitaire: Number(prixUnitaire),
          dateCommande,
          dateLivraison,
          commentaire,
          UserId: 1,
          clientId: Number(client),
          produitId: Number(produit),
        }
      );

      const { commandes } = response.data;

      // 👇 Appelle le parent pour mettre à jour la liste
      if (onUpdateList) {
        onUpdateList(commandes);
        router.refresh();
      }

      // Réinitialise le formulaire
      setQuantite("");
      setPrixUnitaire("");
      setDateCommande("");
      setDateLivraison("");
      setCommentaire("");
      setUser("");
      setClient("");
      setProduit("");
      setIsOpen(false);

    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    } finally {
      setIsLoading(false);
    }
    // await axios.post("/api/commandes", {
    //     quantite: Number(quantite),
    //     prixUnitaire: Number(prixUnitaire),
    //     dateCommande: dateCommande, 
    //     dateLivraison: dateLivraison, 
    //     commentaire: commentaire,
    //     UserId: 1,
    //     clientId: Number(client),
    //     produitId: Number(produit),
    // });
    // setIsLoading(false);
    // setQuantite("");
    // setPrixUnitaire("");
    // setDateCommande("");
    // setDateLivraison("");
    // setCommentaire("");
    // setUser("");
    // setClient("");
    // setProduit("");
    // router.refresh();
    // setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-end mt-4">
      <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 cursor-pointer" onClick={handleModal}>
       <FaPlus className="mr-2" /> Ajouter
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Ajout Nouvelle Commande</h3>
          <form onSubmit={handleSubmit}>
          <div className="form-control w-full">
              <label className="label font-bold">Produit</label>
              <select
                value={produit}
                onChange={(e) => setProduit(e.target.value)}
                className="w-full bg-gray-200 text-gray-900 p-2 rounded border border-gray-300"
              >
                <option value="" disabled>
                  Selectionner un Produit
                </option>
                {produits.map((produit) => (
                  <option value={produit.idProduit} key={produit.idProduit}>
                    {produit.libelle}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control w-full mb-4">
              <label className="label block text-sm font-medium">Quantité</label>
              <input
                type="number"
                value={quantite}
                onChange={(e) => setQuantite(e.target.value)}
                className="w-full bg-gray-200 text-gray-900 p-2 rounded border border-gray-300"
                placeholder="Quantité"
              />
            </div>
            <div className="form-control w-full">
              <label className="label block text-sm font-medium">Prix Unitaire</label>
              <input
                type="number"
                value={prixUnitaire}
                onChange={(e) => setPrixUnitaire(e.target.value)}
                className="w-full bg-gray-200 text-gray-900 p-2 rounded border border-gray-300"
                placeholder="Prix Unitaire"
              />
            </div>
            <div className="form-control w-full">
              <label className="label block text-sm font-medium">Date Commande</label>
              <input
                type="date"
                value={dateCommande}
                onChange={(e) => setDateCommande(e.target.value)}
                className="w-full bg-gray-200 text-gray-900 p-2 rounded border border-gray-300"
                placeholder="Date Commande"
              />
            </div>
            <div className="form-control w-full">
              <label className="label block text-sm font-medium">Date Livraison</label>
              <input
                type="date"
                value={dateLivraison}
                onChange={(e) => setDateLivraison(e.target.value)}
                className="w-full bg-gray-200 text-gray-900 p-2 rounded border border-gray-300"
                placeholder="Date Livraison"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Client</label>
              <select
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="w-full bg-gray-200 text-gray-900 p-2 rounded border border-gray-300"
              >
                <option value="" disabled>
                  Selectionner un Client
                </option>
                {clients.map((client) => (
                  <option value={client.idClient} key={client.idClient}>
                    {client.prenom} {client.nom}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label block text-sm font-medium">Commentaire</label>
              <input
                type="text"
                value={commentaire}
                onChange={(e) => setCommentaire(e.target.value)}
                className="w-full bg-gray-200 text-gray-900 p-2 rounded border border-gray-300"
                placeholder="Commentaire"
              />
            </div>
            <input type="hidden" name="User" value={User} />
            <div className="flex justify-end space-x-2 py-5">
              <button type="button" className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition cursor-pointer" onClick={handleModal}>
                Close
              </button>
              {!isLoading ? (
                <button type="submit" className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700 transition cursor-pointer">
                  Save
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Saving...
                </button>
              )}
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddCommande;
