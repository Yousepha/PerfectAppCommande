"use client";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Modal from "../Modal";
import { FaPlus } from "react-icons/fa";

const AddFournisseur = () => {
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await axios.post("/api/fournisseurs", {
      nom: nom,
      adresse: adresse,
    });
    setIsLoading(false);
    setNom("");
    setAdresse("");
    router.refresh();
    setIsOpen(false);
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
          <h3 className="font-bold text-lg">Ajout Nouveau Fournisseur</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full mb-4">
              <label className="label block text-sm font-medium">Nom Fournisseur</label>
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full bg-gray-200 text-gray-900 p-2 rounded border border-gray-300"
                placeholder="Nom Fournisseur"
              />
            </div>
            <div className="form-control w-full mb-4">
              <label className="label block text-sm font-medium">Adresse Fournisseur</label>
              <input
                type="text"
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
                className="w-full bg-gray-200 text-gray-900 p-2 rounded border border-gray-300"
                placeholder="Adresse Fournisseur"
              />
            </div>
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

export default AddFournisseur;
