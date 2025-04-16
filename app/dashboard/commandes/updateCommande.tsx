/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, SyntheticEvent } from "react";
import { FaEdit } from "react-icons/fa";
import type { Client, Produit } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Modal from "../Modal";

type Commande = {
    idCommande: number;
    quantite: number;
    prixUnitaire: number;
    dateCommande: Date;
    dateLivraison: Date;
    commentaire?: string | null;
    UserId: number;
    clientId: number;
    produitId: number;
};

const UpdateCommande = ({
    clients,
    produits,
    commande,
    onUpdateList,
}: {
    clients: Client[];
    produits: Produit[];
    commande: Commande;
    onUpdateList?: (commandes: any[]) => void;
}) => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "all";
  const page = searchParams.get("page") || "1";

  const [quantite, setQuantite] = useState(commande.quantite);
  const [prixUnitaire, setPrixUnitaire] = useState(commande.prixUnitaire);
  const [dateCommande, setDateCommande] = useState(commande.dateCommande.toString());
  const [dateLivraison, setDateLivraison] = useState(commande.dateLivraison.toString());
  const [client, setClient] = useState(commande.clientId);
  const [produit, setProduit] = useState(commande.produitId);
  const [commentaire, setCommentaire] = useState(commande.commentaire);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.patch(
        `/api/commandes/${commande.idCommande}?page=${page}&status=${status}`,
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

      if (onUpdateList) {
        onUpdateList(commandes);
        router.refresh();
      }

      setIsOpen(false);

    } catch (error) {
      console.error("Erreur lors de la modification :", error);
    } finally {
      setIsLoading(false);
    }

    // await axios.patch(`/api/commandes/${commande.idCommande}`, {
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
    // router.refresh();
    // setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="bg-yellow-300 p-2 rounded-md hover:bg-yellow-400 cursor-pointer" onClick={handleModal}>
        <FaEdit className="text-white" />
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update {commande.prixUnitaire}</h3>
          <form onSubmit={handleUpdate}>
            
            <div className="form-control w-full mb-4">
              <label className="label font-bold">Produit</label>
              <select
                value={produit}
                onChange={(e) => setProduit(Number(e.target.value))}
                className="w-full bg-gray-200 text-gray-900 p-2 rounded border border-gray-300"
              >
                {produits.map((produit) => (
                  <option value={produit.idProduit} key={produit.idProduit}>
                    {produit.libelle}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control w-full mb-4">
              <label className="label font-bold">Quantite</label>
              <input
                type="number"
                value={quantite}
                onChange={(e) => setQuantite(Number(e.target.value))}
                className="w-full bg-gray-200 text-gray-900 p-2 rounded border border-gray-300"
                placeholder="Quantite"
              />
            </div>
            <div className="form-control w-full mb-4">
              <label className="label font-bold">prix Unitaire</label>
              <input
                type="number"
                value={prixUnitaire}
                onChange={(e) => setPrixUnitaire(Number(e.target.value))}
                className="w-full bg-gray-200 text-gray-900 p-2 rounded border border-gray-300"
                placeholder="prix Unitaire"
              />
            </div>
            <div className="form-control w-full mb-4">
              <label className="label font-bold">Date Commande</label>
              <input
                type="date"
                value={dateCommande}
                onChange={(e) => setDateCommande(e.target.value)}
                className="w-full bg-gray-200 text-gray-900 p-2 rounded border border-gray-300"
                placeholder="date Commande"
              />
            </div>
            <div className="form-control w-full mb-4">
              <label className="label font-bold">Date Depense</label>
              <input
                type="date"
                value={dateLivraison}
                onChange={(e) => setDateLivraison(e.target.value)}
                className="w-full bg-gray-200 text-gray-900 p-2 rounded border border-gray-300"
                placeholder="date Livraison"
              />
            </div>
            <div className="form-control w-full mb-4">
              <label className="label font-bold">Client</label>
              <select
                value={client}
                onChange={(e) => setClient(Number(e.target.value))}
                className="w-full bg-gray-200 text-gray-900 p-2 rounded border border-gray-300"
              >
                {clients.map((client) => (
                  <option value={client.idClient} key={client.idClient}>
                    {client.prenom} {client.nom}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control w-full mb-4">
              <label className="label font-bold">Commentaire</label>
              <input
                type="text"
                value={commentaire!}
                onChange={(e) => setCommentaire(e.target.value)}
                className="w-full bg-gray-200 text-gray-900 p-2 rounded border border-gray-300"
                placeholder="Product Name"
              />
            </div>
            
            <div className="flex justify-end space-x-2 py-5">
              <button type="button" className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition cursor-pointer" onClick={handleModal}>
                Close
              </button>
              {!isLoading ? (
                <button type="submit" className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700 transition cursor-pointer">
                  Update
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Updating...
                </button>
              )}
            </div>
          </form>
        </div>
    </Modal>
    </div>
  );
};

export default UpdateCommande;
