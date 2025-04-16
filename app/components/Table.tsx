"use client";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Table = ({ data, title }: { data: any[]; title: string }) => {
  const [items, setItems] = useState(data);

  // Ajouter une nouvelle ligne fictive
  const addItem = () => {
    const newItem = {
      id: items.length + 1,
      name: `Nouvel élément ${items.length + 1}`,
      description: "Description exemple",
    };
    setItems([...items, newItem]);
  };

  // Supprimer un élément
  const deleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <button
          onClick={addItem}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Ajouter
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Nom</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="text-center border">
              <td className="border p-2">{item.id}</td>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.description}</td>
              <td className="border p-2">
                <button className="bg-blue-500 text-white px-2 py-1 mr-2 rounded-md">
                  Modifier
                </button>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
