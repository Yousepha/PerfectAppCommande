"use client";
import { useState, SyntheticEvent } from "react";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";
import Modal from "../Modal";

type Produit = {
    idProduit: number;
    libelle: string;
};

const UpdateProduit = ({
    produit,
}: {
    produit: Produit;
}) => {
  const [libelle, setLibelle] = useState(produit.libelle);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await axios.patch(`/api/products/${produit.idProduit}`, {
      libelle: libelle,
    });
    setIsLoading(false);
    router.refresh();
    setIsOpen(false);
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
          <h3 className="font-bold text-lg">Update {produit.libelle}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control w-full mb-4">
              <label className="label font-bold">Libelle Produit</label>
              <input
                type="text"
                value={libelle}
                onChange={(e) => setLibelle(e.target.value)}
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

export default UpdateProduit;
