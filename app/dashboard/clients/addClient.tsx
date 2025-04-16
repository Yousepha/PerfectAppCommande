"use client";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Modal from "../Modal";
import { FaPlus } from "react-icons/fa";

const AddProduct = () => {

  const [errors, setErrors] = useState({
    nom: "",
    prenom: "",
    adresse: "",
    telephone: "",
    entreprise: "",
  });
  
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [telephone, setTelephone] = useState("");
  const [entreprise, setEntreprise] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = { nom: "", prenom: "", adresse: "", telephone: "", entreprise: "" };
    let isValid = true;
  
    if (!prenom.trim()) {
      newErrors.prenom = "Le prénom est requis";
      isValid = false;
    }
    if (!nom.trim()) {
      newErrors.nom = "Le nom est requis";
      isValid = false;
    }
    if (!adresse.trim()) {
      newErrors.adresse = "L'adresse est requise";
      isValid = false;
    }
    if (!telephone.trim()) {
      newErrors.telephone = "Le téléphone est requis";
      isValid = false;
    } else if (!/^\d{9}$/.test(telephone)) {
      newErrors.telephone = "Le téléphone doit contenir 9 chiffres";
      isValid = false;
    }
    if (!entreprise.trim()) {
      newErrors.entreprise = "L'entreprise est requise";
      isValid = false;
    }
  
    setErrors(newErrors);
    return isValid;
  };
  
  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);
    await axios.post("/api/clients", {
      nom: nom,
      prenom: prenom,
      adresse: adresse,
      telephone: telephone,
      entreprise: entreprise,
    });
    setIsLoading(false);
    setNom("");
    setPrenom("");
    setAdresse("");
    setTelephone("");
    setEntreprise("");
    setErrors({ nom: "", prenom: "", adresse: "", telephone: "", entreprise: "" });
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
        <div className="modal-box max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400">
          <h3 className="font-bold text-lg">Ajout Nouveau Client</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full mb-4">
              <label className="label block text-sm font-medium">Prénom Client</label>
              <input
                type="text"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                className="w-full bg-gray-200 text-gray-900 p-2 rounded border border-gray-300"
                placeholder="Prénom"
              />
              {errors.prenom && <p className="text-red-500 text-sm mt-1">{errors.prenom}</p>}
            </div>
            <div className="form-control w-full mb-4">
              <label className="label block text-sm font-medium">Nom Client</label>
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full bg-gray-200 text-gray-900 p-2 rounded border border-gray-300"
                placeholder="Nom"
              />
              {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom}</p>}
            </div>
            <div className="form-control w-full mb-4">
              <label className="label block text-sm font-medium">Adresse</label>
              <input
                type="text"
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
                className="w-full bg-gray-200 text-gray-900 p-2 rounded border border-gray-300"
                placeholder="Adresse"
              />
              {errors.adresse && <p className="text-red-500 text-sm mt-1">{errors.adresse}</p>}
            </div>
            <div className="form-control w-full mb-4">
              <label className="label block text-sm font-medium">Téléphone</label>
              <input
                type="text"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                className="w-full bg-gray-200 text-gray-900 p-2 rounded border border-gray-300"
                placeholder="Téléphone"
              />
              {errors.telephone && <p className="text-red-500 text-sm mt-1">{errors.telephone}</p>}
            </div>
            <div className="form-control w-full mb-4">
              <label className="label block text-sm font-medium">Entreprise</label>
              <input
                type="text"
                value={entreprise}
                onChange={(e) => setEntreprise(e.target.value)}
                className="w-full bg-gray-200 text-gray-900 p-2 rounded border border-gray-300"
                placeholder="Entreprise"
              />
              {errors.entreprise && <p className="text-red-500 text-sm mt-1">{errors.entreprise}</p>}
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

export default AddProduct;
