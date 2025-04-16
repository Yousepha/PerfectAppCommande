// "use client";
// import { useEffect, useState } from "react";
// import { FaBox, FaShoppingCart, FaDollarSign, FaUsers, FaUserFriends } from "react-icons/fa";
// import Image from "next/image";
// import Link from "next/link";
// import {jwtDecode} from "jwt-decode"; // Pour décoder le token JWT

// type User = {
//     prenom: string;
//     nom: string;
//     role: "ADMIN" | "ASSISTANT";
// };

// const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
//     const [user, setUser] = useState<User | null>(null);

//     useEffect(() => {
//         const token = localStorage.getItem("token"); // Récupération du token

//         if (token) {
//             try {
//                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
//                 const decoded: any = jwtDecode(token); // Décoder le token JWT
//                 setUser({ 
//                     prenom: decoded.prenom, 
//                     nom: decoded.nom, 
//                     role: decoded.role 
//                 });
//             } catch (error) {
//                 console.error("Erreur de décodage du token", error);
//             }
//         }
//     }, []);

//     return (
//         <aside className={`bg-orange-600 text-white min-h-screen transition-all duration-300 ${isOpen ? "w-64" : "w-20"} flex flex-col overflow-y-auto`}>
//             {/* LOGO */}
//             <div className="flex items-center justify-center py-4">
//                 <Image src="/logo.png" alt="Logo" width={isOpen ? 120 : 40} height={40} />
//             </div>

//             {/* Infos Utilisateur */}
//             <div className="text-center py-4 border-b border-white">
//                 {user ? (
//                     <p className="font-semibold">{user.prenom} {user.nom}</p>
//                 ) : (
//                     <p className="italic">Utilisateur</p>
//                 )}
//             </div>

//             {/* Menu */}
//             <nav className="flex-1 flex flex-col space-y-4 mt-4">
//                 <Link href="/dashboard/produits" className="flex items-center space-x-2 p-2 hover:bg-orange-500 rounded">
//                     <NavItem icon={FaBox} text="Produits" isOpen={isOpen} />
//                 </Link>
//                 <Link href="/dashboard/commandes" className="flex items-center space-x-2 p-2 hover:bg-orange-500 rounded">
//                     <NavItem icon={FaShoppingCart} text="Commandes" isOpen={isOpen} />
//                 </Link>

//                 {/* Afficher Dépenses et Fournisseurs UNIQUEMENT pour l'ADMIN */}
//                 {user?.role === "ADMIN" && (
//                     <>
//                         <Link href="/dashboard/depenses" className="flex items-center space-x-2 p-2 hover:bg-orange-500 rounded">
//                             <NavItem icon={FaDollarSign} text="Dépenses" isOpen={isOpen} />
//                         </Link>
//                         <Link href="/dashboard/fournisseurs" className="flex items-center space-x-2 p-2 hover:bg-orange-500 rounded">
//                             <NavItem icon={FaUserFriends} text="Fournisseurs" isOpen={isOpen} />
//                         </Link>
//                     </>
//                 )}

//                 <Link href="/dashboard/clients" className="flex items-center space-x-2 p-2 hover:bg-orange-500 rounded">
//                     <NavItem icon={FaUsers} text="Clients" isOpen={isOpen} />
//                 </Link>
//             </nav>
//         </aside>
//     );
// };

// // Composant NavItem
// const NavItem = ({ icon: Icon, text, isOpen }: { icon: React.ElementType; text: string; isOpen: boolean }) => (
//     <div className="flex items-center space-x-2 px-4 py-2 cursor-pointer hover:bg-orange-700">
//         <Icon size={24} />
//         {isOpen && <span>{text}</span>}
//     </div>
// );

// export default Sidebar;



"use client";
import { useEffect, useState } from "react";
import { FaBox, FaShoppingCart, FaDollarSign, FaUsers, FaUserFriends } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
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

  // Définition des menus disponibles selon le rôle
  const menuItems = [
    { href: "/dashboard/produits", icon: FaBox, text: "Produits" },
    { href: "/dashboard/commandes", icon: FaShoppingCart, text: "Commandes" },
    { href: "/dashboard/depenses", icon: FaDollarSign, text: "Dépenses", restricted: true },
    { href: "/dashboard/clients", icon: FaUsers, text: "Clients" },
    { href: "/dashboard/fournisseurs", icon: FaUserFriends, text: "Fournisseurs", restricted: true },
  ];

  return (
    <aside
      className={`bg-orange-600 text-white min-h-screen transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      } flex flex-col overflow-y-auto`}
    >
      {/* LOGO */}
      <div className="flex items-center justify-center py-4">
        <Image src="/logo.png" alt="Logo" width={isOpen ? 120 : 40} height={40} />
      </div>

      {/* Séparateur blanc */}
      <div className="border-b border-white opacity-50 mx-4"></div>

      {/* Menu */}
      <nav className="flex-1 flex flex-col space-y-4 mt-4">
        {menuItems.map((item) => {
          // Si l'utilisateur est assistant et l'item est restreint, on l'exclut
          if (role === "ASSISTANT" && item.restricted) return null;

          return (
            <Link key={item.href} href={item.href} className="flex items-center space-x-2 p-2 hover:bg-orange-500 rounded">
              <NavItem icon={item.icon} text={item.text} isOpen={isOpen} />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

// Composant NavItem
const NavItem = ({ icon: Icon, text, isOpen }: { icon: React.ElementType; text: string; isOpen: boolean }) => (
  <div className="flex items-center space-x-2 px-4 py-2 cursor-pointer hover:bg-orange-700">
    <Icon size={24} />
    {isOpen && <span>{text}</span>}
  </div>
);

export default Sidebar;





// "use client";
// import { FaBox, FaShoppingCart, FaDollarSign, FaUsers, FaUserFriends } from "react-icons/fa";
// import Image from "next/image";
// import Link from "next/link";

// const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
//     return (
//         <aside className={`bg-orange-600 text-white min-h-screen transition-all duration-300 ${isOpen ? "w-64" : "w-20"} flex flex-col overflow-y-auto`}>
//             {/* LOGO */}
//             <div className="flex items-center justify-center py-4">
//                 <Image src="/logo.png" alt="Logo" width={isOpen ? 120 : 40} height={40} />
//             </div>

//             {/* Séparateur blanc */}
//             <div className="border-b border-white opacity-50 mx-4"></div>

//             {/* Menu */}
//             <nav className="flex-1 flex flex-col space-y-4 mt-4">
//                 <Link href="/dashboard/produits" className="flex items-center space-x-2 p-2 hover:bg-orange-500 rounded">
//                     <NavItem icon={FaBox} text="Produits" isOpen={isOpen} />
//                 </Link>
//                 <Link href="/dashboard/commandes" className="flex items-center space-x-2 p-2 hover:bg-orange-500 rounded">
//                     <NavItem icon={FaShoppingCart} text="Commandes" isOpen={isOpen} />
//                 </Link>
//                 <Link href="/dashboard/depenses" className="flex items-center space-x-2 p-2 hover:bg-orange-500 rounded">
//                     <NavItem icon={FaDollarSign} text="Dépenses" isOpen={isOpen} />
//                 </Link>
//                 <Link href="/dashboard/clients" className="flex items-center space-x-2 p-2 hover:bg-orange-500 rounded">
//                     <NavItem icon={FaUsers} text="Clients" isOpen={isOpen} />
//                 </Link>
//                 <Link href="/dashboard/fournisseurs" className="flex items-center space-x-2 p-2 hover:bg-orange-500 rounded">
//                     <NavItem icon={FaUserFriends} text="Fournisseurs" isOpen={isOpen} />
//                 </Link>
//             </nav>
//         </aside>
//     );
// };

// // Composant NavItem
// const NavItem = ({ icon: Icon, text, isOpen }: { icon: React.ElementType; text: string; isOpen: boolean }) => (
//     <div className="flex items-center space-x-2 px-4 py-2 cursor-pointer hover:bg-orange-700">
//         <Icon size={24} />
//         {isOpen && <span>{text}</span>}
//     </div>
// );

// export default Sidebar;
