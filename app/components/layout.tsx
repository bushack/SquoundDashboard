"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";
import { buttonStyle, dangerButton, primaryButton, sidebarButton } from "@/styles/ui";

type LayoutProps = {
  children: ReactNode;
  headerTitle?: string;
  sidebarTitle?: string;
};


export default function Layout({ children, headerTitle, sidebarTitle }: LayoutProps) {

  const router = useRouter();


  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("../");
  };


  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif", fontSize: "10pt", fontWeight: "normal" }}>

      {/* Sidebar */}
      <aside style={{
        width: "220px",
        backgroundColor: "#999999",
        color: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column"
      }}>
        <h2 style={{ marginBottom: "20px", fontSize: "20px", fontWeight: "bold" }}>{sidebarTitle || "Sidebar"}</h2>
        <Link href="/" style={sidebarButton}>Home</Link>
        <Link href="/add-customer" style={sidebarButton}>Add Customer</Link>
        <Link href="/customers" style={sidebarButton}>Search Customers</Link>
        <Link href="/finder" style={sidebarButton}>Find Customers</Link>
        <Link href="/add-product" style={sidebarButton}>Add Product</Link>
        <Link href="/products" style={sidebarButton}>Search Products</Link>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", backgroundColor: "#dedede"}}>

        {/* Header */}
        <header style={{
          height: "60px",
          flexShrink: 0,
          backgroundColor: "#6e6e6e",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0px 20px",
          fontSize: "14pt",
          fontWeight: "bold"
        }}>
          
          {/* Dynamic Title */ }
          <h1>{headerTitle || "Dashboard"}</h1>

          {/* Placeholder for login/logout */}
          <div>
            <button
              style={buttonStyle}
              onClick={signOut}
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ padding: "30px", overflowY: "auto" }}>{children}</main>
      </div>
    </div>
  );
}
