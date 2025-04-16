"use client";
import StatsCards from "@/app/components/StatsCards";
import OrdersTable from "@/app/components/OrdersTable";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";


type UserType = {
  id: number;
  email: string;
  prenom: string;
  nom: string;
  role: string;
};

export default function Home() {

  const [user, setUser] = useState<UserType | null>(null);
  const router  = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.post('/api/verify-token', { token })
      .then(response => {
        setUser(response.data.user);
      })
      .catch(error => {
        console.error('Invalid token', error);
        router.push('/login')
      })
    } else{
        router.push('/login')
    }
  }, [router])
  
  if (!user) {
    return <div>Loading....</div>
  }

  return (
    <div className="flex bg-gray-200">

      <div className="flex-1 flex flex-col">

        {/* Contenu principal */}
        <div className="p-6">
          <StatsCards />
          <OrdersTable />
        </div>
      </div>
    </div>
  );
}
