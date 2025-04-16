"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import Modal from "../Modal";

type Fournisseur = {
  idFournisseur: number;
  nom: string;
  adresse: string;
};

const DeleteFournisseur = ({ fournisseur }: { fournisseur: Fournisseur }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleDelete = async (fournisseurId: number) => {
    setIsLoading(true);
    await axios.delete(`/api/fournisseurs/${fournisseurId}`);
    setIsLoading(false);
    router.refresh();
    setIsOpen(false);
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
            Etes vous sur de Supprimer {fournisseur.nom}?
          </h3>

          <div className="flex justify-end space-x-2 py-5">
            <button type="button" className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition cursor-pointer" onClick={handleModal}>
              Non
            </button>
            {!isLoading ? (
              <button
                type="button"
                onClick={() => handleDelete(fournisseur.idFournisseur)}
                className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700 transition cursor-pointer"
              >
                Oui
              </button>
            ) : (
              <button type="button" className="btn loading">
                Suppression...
              </button>
            )}
          </div>
        </div>
        </Modal>
    </div>
  );
};

export default DeleteFournisseur;
