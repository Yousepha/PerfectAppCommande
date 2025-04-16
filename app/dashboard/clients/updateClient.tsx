"use client";
import { useState, SyntheticEvent } from "react";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";
import Modal from "../Modal";

type Client = {
  idClient: number;
  prenom: string;
  nom: string;
  adresse: string;
  telephone: string;
  entreprise?: string | null;
};

const UpdateClient = ({
    client,
}: {
    client: Client;
}) => {
  const [nom, setNom] = useState(client.nom);
  const [prenom, setPrenom] = useState(client.prenom);
  const [adresse, setAdresse] = useState(client.adresse);
  const [telephone, setTelephone] = useState(client.telephone);
  const [entreprise, setEntreprise] = useState(client.entreprise);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await axios.patch(`/api/clients/${client.idClient}`, {
        nom: nom,
        prenom: prenom,
        adresse: adresse,
        telephone: telephone,
        entreprise: entreprise,
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
          <h3 className="font-bold text-lg">Update {client.nom}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control w-full mb-4">
              <label className="label font-bold">Nom Client</label>
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full bg-gray-200 text-gray-900 p-2 rounded border border-gray-300"
                placeholder="Nom"
              />
            </div>
            <div className="form-control w-full mb-4">
              <label className="label font-bold">Prénom Client</label>
              <input
                type="text"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                className="w-full bg-gray-200 text-gray-900 p-2 rounded border border-gray-300"
                placeholder="Prénom"
              />
            </div>
            <div className="form-control w-full mb-4">
              <label className="label font-bold">Adresse</label>
              <input
                type="text"
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
                className="w-full bg-gray-200 text-gray-900 p-2 rounded border border-gray-300"
                placeholder="Adresse"
              />
            </div>
            <div className="form-control w-full mb-4">
              <label className="label font-bold">Téléphone</label>
              <input
                type="text"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                className="w-full bg-gray-200 text-gray-900 p-2 rounded border border-gray-300"
                placeholder="Telephone"
              />
            </div>
            <div className="form-control w-full mb-4">
              <label className="label font-bold">Entreprise</label>
              <input
                type="text"
                value={entreprise!}
                onChange={(e) => setEntreprise(e.target.value)}
                className="w-full bg-gray-200 text-gray-900 p-2 rounded border border-gray-300"
                placeholder="Entreprise"
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

export default UpdateClient;
