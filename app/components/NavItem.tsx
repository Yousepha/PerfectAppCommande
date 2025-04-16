"use client";
import { FaSearch, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="bg-orange-400 text-white flex items-center px-6 py-3 shadow-md">
      {/* Barre de recherche centrée */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full pl-4 pr-10 py-2 rounded-full bg-white text-gray-700 placeholder-gray-500 focus:outline-none shadow-sm"
          />
          <FaSearch className="absolute right-3 top-3 text-gray-500" />
        </div>
      </div>

      {/* Section Admin bien alignée */}
      <div className="flex items-center space-x-2">
        <FaUserCircle className="text-3xl" />
        <span className="italic font-medium">Admin</span>
      </div>
    </div>
  );
};

export default Navbar;
