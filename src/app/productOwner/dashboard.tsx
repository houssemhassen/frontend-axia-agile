"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, History, CreditCard, LayoutDashboard } from "lucide-react";

export default function DashboardProductOwner() {
  const [stats, setStats] = useState({
    users: 0,
    logs: 0,
    billing: 0,
  });

  // Simulated fetch
  useEffect(() => {
    setTimeout(() => {
      setStats({
        users: 152,
        logs: 1345,
        billing: 12,
      });
    }, 600);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <LayoutDashboard size={28} />
        Superadmin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users /> Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.users}</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History /> Activity Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.logs}</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard /> Active Billing Accounts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.billing}</p>
          </CardContent>
        </Card>

      </div>

      {/* SECTION EXTRAS */}
      <div className="mt-10">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Bienvenue dans le tableau de bord Superadmin.  
              Vous pouvez gérer les utilisateurs, suivre l’activité, consulter la facturation
              et administrer le système.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
