"use client";
import { useEffect } from "react";

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
  useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-auto bg-opacity-60 backdrop-brightness-40 z-50">
      {/* Contenu du Modal */}
      <div className="bg-white text-gray-900 p-6 rounded-lg shadow-2xl w-[450px] relative animate-fadeIn">
        {/* Bouton de fermeture */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl font-bold cursor-pointer">
          ×
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
