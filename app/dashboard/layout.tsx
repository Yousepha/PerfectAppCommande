"use client";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex bg-gray-200">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      <div className="flex-1 flex flex-col">
        {/* Navbar avec le bouton pour la sidebar */}
        <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

        {/* Contenu principal */}
        
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
