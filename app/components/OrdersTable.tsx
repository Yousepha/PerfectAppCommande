const OrdersTable = () => {
    const orders = [
      { id: 1, client: "Fallou Diop", produit: "Site internet", prix: "200 000 FCFA" },
      { id: 2, client: "Diarra Ndiaye", produit: "Site internet", prix: "200 000 FCFA" },
      { id: 3, client: "Bass Thiam", produit: "Site internet", prix: "200 000 FCFA" },
      { id: 4, client: "Céline Fall", produit: "Site internet", prix: "200 000 FCFA" },
    ];
  
    return (
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3">N°</th>
            <th className="p-3">Clients</th>
            <th className="p-3">Produits</th>
            <th className="p-3">Prix</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="text-center border-t">
              <td className="p-3">{order.id}</td>
              <td className="p-3">{order.client}</td>
              <td className="p-3">{order.produit}</td>
              <td className="p-3">{order.prix}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default OrdersTable;
  