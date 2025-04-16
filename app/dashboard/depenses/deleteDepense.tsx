"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import Modal from "../Modal";

type Depense = {
  idDepense: number;
  libelle: string;
  quantite: number;
  prixUnitaire: number;
  dateDepense: Date;
  fournisseurId: number;
};

const DeleteDepense = ({ depense }: { depense: Depense }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleDelete = async (depenseId: number) => {
    setIsLoading(true);
    await axios.delete(`/api/depenses/${depenseId}`);
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
            Etes vous sur de Supprimer {depense.libelle}?
          </h3>

          <div className="flex justify-end space-x-2 py-5">
            <button type="button" className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition cursor-pointer" onClick={handleModal}>
              No
            </button>
            {!isLoading ? (
              <button
                type="button"
                onClick={() => handleDelete(depense.idDepense)}
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

export default DeleteDepense;
