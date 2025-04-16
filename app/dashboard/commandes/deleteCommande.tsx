"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
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
type Props = {
  commande: Commande;
  onUpdateList?: (commandes: Commande[]) => void;
};

const DeleteCommande = (
  { commande, onUpdateList }: Props

) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleDelete = async (commandeId: number) => {
    setIsLoading(true);
    try {
      const page = searchParams.get("page") || "1";
      const status = searchParams.get("status") || "all";

      const response = await axios.delete(`/api/commandes/${commandeId}?page=${page}&status=${status}`);
      const updatedCommandes = response.data.commandes;

      // 👇 Appelle le parent pour mettre à jour la liste
      if (onUpdateList) {
        onUpdateList(updatedCommandes);
        router.refresh();
      }
      
      // router.refresh(); // recharge la liste des commandes
      // setIsOpen(false);
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="bg-red-500 p-2 rounded-md hover:bg-red-600" onClick={handleModal}>
        <FaTrash className="text-white" />
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Etes vous sur de Supprimer N° {commande.idCommande}?
          </h3>

          <div className="flex justify-end space-x-2 py-5">
            <button type="button" className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition cursor-pointer" onClick={handleModal}>
              No
            </button>
            {!isLoading ? (
              <button
                type="button"
                onClick={() => handleDelete(commande.idCommande)}
                className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700 transition cursor-pointer"
              >
                Yes
              </button>
            ) : (
              <button type="button" className="btn loading">
                Deleting...
              </button>
            )}
          </div>
        </div>
        </Modal>
    </div>
  );
};

export default DeleteCommande;
