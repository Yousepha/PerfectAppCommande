import CommandesClient from "./CommandesClient";

const CommandesPage = () => {
  return <CommandesClient />;
};

export default CommandesPage;


// import prisma from "@/app/lib/prisma";
// import Link from "next/link";
// import AddCommande from "./addCommande";
// import UpdateCommande from "./updateCommande";
// import DeleteCommande from "./deleteCommande";

// const formatDate = (dateString: string) => {
//   if (!dateString) return "";
//   const date = new Date(dateString);
//   return date.toLocaleDateString("fr-FR", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//   });
// };

// const getCommandes = async (page: number, pageSize: number) => {
//   const totalCount = await prisma.commande.count();
//   const commandes = await prisma.commande.findMany({
//     skip: (page - 1) * pageSize,
//     take: pageSize,
//     select: {
//       idCommande: true,
//       quantite: true,
//       prixUnitaire: true,
//       dateCommande: true,
//       dateLivraison: true,
//       commentaire: true,
//       UserId: true,
//       User: true,
//       clientId: true,
//       client: true,
//       produitId: true,
//       produit: true,
//     },
//   });

//   return { commandes, totalPages: Math.ceil(totalCount / pageSize) };
// };

// const getClients = async () => {
//   return await prisma.client.findMany();
// };

// const getProduits = async () => {
//   return await prisma.produit.findMany();
// };

// const CommandesPage = async ({ searchParams }: { searchParams: { page?: string } }) => {
//   const pageSize = 5; // Nombre d'éléments par page
//   const page = parseInt(searchParams.page || "1", 10); // Convertir le paramètre en nombre
//   const { commandes, totalPages } = await getCommandes(page, pageSize);
//   const clients = await getClients();
//   const produits = await getProduits();

//   return (
//     <div>
//       {/* Titre */}
//       <h1 className="text-2xl font-bold text-center text-indigo-900 italic">LISTE DES COMMANDES</h1>
//       <AddCommande clients={clients} produits={produits} />

//       {/* Tableau des dépenses */}
//       <div className="mt-6 bg-white shadow-md rounded-lg overflow-hidden">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-3 font-bold">N°</th>
//               <th className="p-3 font-bold">Produit</th>
//               <th className="p-3 font-bold">Client</th>
//               <th className="p-3 font-bold">Quantité</th>
//               <th className="p-3 font-bold">Prix Unitaire</th>
//               <th className="p-3 font-bold">Prix Total</th> 
//               <th className="p-3 font-bold">Date Comm</th> 
//               <th className="p-3 font-bold">Date Liv</th>
//               <th className="p-3 font-bold">Comt</th>
//               <th className="p-3 font-bold">ACTION</th>
//             </tr>
//           </thead>
//           <tbody>
//             {commandes.map((commande, index) => (
//               <tr key={commande.idCommande} className="border-t">
//                 <td className="p-3">{(page - 1) * pageSize + index + 1}</td>
//                 <td className="p-3">{commande.produit?.libelle}</td>
//                 <td className="p-3">{commande.client?.prenom} {commande.client?.nom}</td>
//                 <td className="p-3">{commande.quantite}</td>
//                 <td className="p-3">{commande.prixUnitaire.toLocaleString()} FCFA</td>
//                 <td className="p-3 font-bold">{commande.quantite * commande.prixUnitaire} FCFA</td>
//                 <td className="p-3">{formatDate(commande.dateCommande.toString())}</td>
//                 <td className="p-3">{formatDate(commande.dateLivraison.toString())}</td>
//                 <td className="p-3">{commande.commentaire}</td>
//                 <td className="p-3 flex space-x-2">
//                   <UpdateCommande clients={clients} produits={produits} commande={commande} />
//                   <DeleteCommande commande={commande} />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-between mt-4">
//         <Link
//           href={`?page=${page - 1}`}
//           className={`px-4 py-2 bg-gray-300 rounded ${page === 1 ? "opacity-50 pointer-events-none" : ""}`}
//         >
//           Précédent
//         </Link>
//         <span className="px-4 py-2">Page {page} / {totalPages}</span>
//         <Link
//           href={`?page=${page + 1}`}
//           className={`px-4 py-2 bg-gray-300 rounded ${page >= totalPages ? "opacity-50 pointer-events-none" : ""}`}
//         >
//           Suivant
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default CommandesPage;












// import { FaPlus, FaEdit, FaTrash, FaSearch, FaSortDown } from "react-icons/fa";

// const CommandesPage = () => {
//   const commandes = [
//     { id: 1, client: "Fallou Diop", produit: "site internet", prix: 200000, qte: 3, dateCom: "02/01/2025", dateLiv: "02/03/2025", commentaire: "Bien" },
//     { id: 2, client: "Diarra Ndiaye", produit: "site internet", prix: 200000, qte: 2, dateCom: "10/01/2025", dateLiv: "10/03/2025", commentaire: "Bien" },
//     { id: 3, client: "Bass Thiam", produit: "site internet", prix: 200000, qte: 1, dateCom: "12/02/2025", dateLiv: "12/04/2025", commentaire: "Bien" },
//     { id: 4, client: "Céline Fall", produit: "site internet", prix: 200000, qte: 1, dateCom: "04/02/2025", dateLiv: "04/04/2025", commentaire: "Bien" },
//   ];

//   return (
//     <div className="p-6">
//       {/* Titre */}
//       <h1 className="text-2xl font-bold text-center text-indigo-900 italic">LISTE DES COMMANDES</h1>

//       {/* Barre de filtre & recherche */}
//       <div className="flex items-center justify-between mt-4">
//         {/* Filtre Commandes en cours */}
//         <div className="flex items-center bg-gray-400 text-white px-4 py-2 rounded-lg shadow-md">
//           <span className="mr-2">COMMANDES EN COURS</span>
//           <FaSortDown />
//           <FaSearch className="ml-4 text-black cursor-pointer" />
//         </div>

//         {/* Bouton Ajouter */}
//         <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600">
//           <FaPlus className="mr-2" /> Ajouter
//         </button>
//       </div>

//       {/* Tableau */}
//       <div className="mt-6 bg-white shadow-md rounded-lg overflow-hidden">
//         <table className="w-full text-left border-collapse">
//           {/* En-tête */}
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-3 font-bold">N°</th>
//               <th className="p-3 font-bold">Clients</th>
//               <th className="p-3 font-bold">Produits</th>
//               <th className="p-3 font-bold">Prix</th>
//               <th className="p-3 font-bold">Qte</th>
//               <th className="p-3 font-bold">Prix Total</th>
//               <th className="p-3 font-bold">DateCom</th>
//               <th className="p-3 font-bold">DateLiv</th>
//               <th className="p-3 font-bold">Comt</th>
//               <th className="p-3 font-bold">ACT</th>
//             </tr>
//           </thead>

//           {/* Corps du tableau */}
//           <tbody>
//             {commandes.map((commande, index) => (
//               <tr key={commande.id} className="border-t">
//                 <td className="p-3">{index + 1}</td>
//                 <td className="p-3">{commande.client}</td>
//                 <td className="p-3">{commande.produit}</td>
//                 <td className="p-3">{commande.prix.toLocaleString()} FCFA</td>
//                 <td className="p-3">{commande.qte}</td>
//                 <td className="p-3 font-bold">{(commande.prix * commande.qte).toLocaleString()} FCFA</td>
//                 <td className="p-3">{commande.dateCom}</td>
//                 <td className="p-3">{commande.dateLiv}</td>
//                 <td className="p-3">{commande.commentaire}</td>
//                 <td className="p-3 flex space-x-2">
//                   {/* Bouton Modifier */}
//                   <button className="bg-yellow-300 p-2 rounded-md hover:bg-yellow-400">
//                     <FaEdit className="text-white" />
//                   </button>
//                   {/* Bouton Supprimer */}
//                   <button className="bg-red-500 p-2 rounded-md hover:bg-red-600">
//                     <FaTrash className="text-white" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CommandesPage;
