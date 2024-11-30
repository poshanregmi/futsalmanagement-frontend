// app/page.tsx

"use client";

import { useAuth } from "@/Context/AuthContext";
import Dashboard from "./Dashboard/page";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    redirect("/Login");
  }

  return <Dashboard />;
}
