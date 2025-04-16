"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaBars, FaSearch, FaUserCircle } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const [role, setRole] = useState<string | null>(null);
  
    // Récupération du rôle utilisateur au chargement
    useEffect(() => {
      const token = localStorage.getItem("token");
      console.log(token);
  
      if (token) {
          try {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const decoded: any = jwtDecode(token); // Décoder le token JWT
              setRole(decoded.role);
              console.log(decoded.role)
          } catch (error) {
              console.error("Erreur de décodage du token", error);
          }
      }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("token"); // Suppression du token (si stocké)
    router.push("/login"); // Redirection vers la page de connexion
  };

  return (
    <nav className="bg-orange-500 flex items-center justify-between p-4 shadow-md relative">
      {/* Bouton pour ouvrir/fermer la sidebar */}
      <button onClick={toggleSidebar} className="text-white cursor-pointer">
        <FaBars size={24} />
      </button>

      {/* Barre de recherche au centre */}
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

      {/* Partie droite : Profil Admin */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 text-white focus:outline-none"
        >
          <FaUserCircle className="text-3xl" />
          <span className="italic font-medium">{role}</span>
        </button>

        {/* Menu déroulant */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-gray-700 rounded-lg shadow-lg py-2">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Se déconnecter
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;



// "use client";
// import { FaBars, FaSearch, FaUserCircle } from "react-icons/fa";

// const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
//   return (
//     <nav className="bg-orange-500 flex items-center justify-between p-4 shadow-md">
//         {/* Bouton pour ouvrir/fermer la sidebar */}
//         <button onClick={toggleSidebar} className="text-white cursor-pointer">
//           <FaBars size={24} />
//         </button>
//       {/* Barre de recherche au centre */}
//       <div className="flex-1 flex justify-center">
//       <div className="relative w-full max-w-md">
//           <input
//             type="text"
//             placeholder="Rechercher..."
//             className="w-full pl-4 pr-10 py-2 rounded-full bg-white text-gray-700 placeholder-gray-500 focus:outline-none shadow-sm"
//           />
//           <FaSearch className="absolute right-3 top-3 text-gray-500" />
//         </div>
//       </div>

//       {/* Partie droite : Bouton et compte Admin */}
//       {/* <div className="flex items-center space-x-4"> */}
        

//         {/* Compte Admin */}
//         <div className="flex items-center space-x-2 text-white">
//         <FaUserCircle className="text-3xl" />
//         <span className="italic font-medium">Admin</span>
//       </div>
//       {/* </div> */}
//     </nav>
//   );
// };

// export default Navbar;
