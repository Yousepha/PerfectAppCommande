"use client";
import { useState, SyntheticEvent } from "react";
import type { Fournisseur } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";
import Modal from "../Modal";
import { FaPlus } from "react-icons/fa";

const AddDepense = ({ fournisseurs }: { fournisseurs: Fournisseur[] }) => {
  const [libelle, setLibelle] = useState("");
  const [quantite, setQuantite] = useState(""); 
  const [dateDepense, setDateDepense] = useState(""); 
  const [prixUnitaire, setPrixUnitaire] = useState("");
  const [fournisseur, setFournisseur] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await axios.post("/api/depenses", {
      libelle: libelle,
      quantite: Number(quantite),
      prixUnitaire: Number(prixUnitaire),
      dateDepense: dateDepense, // Utilisation de la date formatée,
      fournisseurId: Number(fournisseur),
    });
    setIsLoading(false);
    setLibelle("");
    setQuantite("");
    setPrixUnitaire("");
    setFournisseur("");
    setDateDepense("");
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
          <h3 className="font-bold text-lg">Ajout Nouvelle Dépense</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full mb-4">
              <label className="label block text-sm font-medium">Libelle Depense</label>
              <input
                type="text"
                value={libelle}
                onChange={(e) => setLibelle(e.target.value)}
                className="w-full bg-gray-200 text-gray-900 p-2 rounded border border-gray-300"
                placeholder="Libelle Depense"
              />
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
              <label className="label block text-sm font-medium">Date Depense</label>
              <input
                type="date"
                value={dateDepense}
                onChange={(e) => setDateDepense(e.target.value)}
                className="w-full bg-gray-200 text-gray-900 p-2 rounded border border-gray-300"
                placeholder="Date Dépense"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Fournisseur</label>
              <select
                value={fournisseur}
                onChange={(e) => setFournisseur(e.target.value)}
                className="w-full bg-gray-200 text-gray-900 p-2 rounded border border-gray-300"
              >
                <option value="" disabled>
                  Selectionner un Fournisseur
                </option>
                {fournisseurs.map((fournisseur) => (
                  <option value={fournisseur.idFournisseur} key={fournisseur.idFournisseur}>
                    {fournisseur.nom}
                  </option>
                ))}
              </select>
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

export default AddDepense;
