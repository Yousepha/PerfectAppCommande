"use client";
import { useState, SyntheticEvent } from "react";
import { FaEdit } from "react-icons/fa";
import type { Fournisseur } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";
import Modal from "../Modal";

type Depense = {
    idDepense: number;
    libelle: string;
    quantite: number;
    prixUnitaire: number;
    dateDepense: Date;
    fournisseurId: number;
};

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const UpdateDepense = ({
    fournisseurs,
    depense,
}: {
    fournisseurs: Fournisseur[];
    depense: Depense;
}) => {
  const [libelle, setLibelle] = useState(depense.libelle);
  const [quantite, setQuantite] = useState(depense.quantite);
  const [prixUnitaire, setPrixUnitaire] = useState(depense.prixUnitaire);
  const [dateDepense, setDateDepense] = useState(formatDate(depense.dateDepense.toISOString()));
  const [fournisseur, setFournisseur] = useState(depense.fournisseurId);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await axios.patch(`/api/depenses/${depense.idDepense}`, {
      libelle: libelle,
      quantite: Number(quantite),
      dateDepense: dateDepense,
      prixUnitaire: Number(prixUnitaire),
      fournisseurId: Number(fournisseur),
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
          <h3 className="font-bold text-lg">Update {depense.libelle}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control w-full mb-4">
              <label className="label font-bold">Libelle Depense</label>
              <input
                type="text"
                value={libelle}
                onChange={(e) => setLibelle(e.target.value)}
                className="w-full bg-gray-200 text-gray-900 p-2 rounded border border-gray-300"
                placeholder="Product Name"
              />
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
              <label className="label font-bold">Date Depense</label>
              <input
                type="date"
                value={dateDepense}
                onChange={(e) => setDateDepense(e.target.value)}
                className="w-full bg-gray-200 text-gray-900 p-2 rounded border border-gray-300"
                placeholder="dateDepense"
              />
            </div>
            <div className="form-control w-full mb-4">
              <label className="label font-bold">Fournisseur</label>
              <select
                value={fournisseur}
                onChange={(e) => setFournisseur(Number(e.target.value))}
                className="w-full bg-gray-200 text-gray-900 p-2 rounded border border-gray-300"
              >
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

export default UpdateDepense;
