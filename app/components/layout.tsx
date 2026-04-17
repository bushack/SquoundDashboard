"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";
import { importantButton, dangerButton, footerStyle, primaryButton, sidebarButton } from "@/styles/ui";
import { theme } from "@/styles/themes"

import { FOOTER_TEXT, SIDEBAR_TITLE } from "@/config/app";

type LayoutProps = {
  children: ReactNode;
  headerTitle?: string;
  sidebarTitle?: string;
  footerText?: string;
};


export default function Layout({ children, headerTitle, sidebarTitle, footerText }: LayoutProps) {

  const router = useRouter();


  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("../");
  };


  return (
    
    <div style={{display: "flex", flexDirection: "column", height: "100vh"}}>

      {/* Header */}
      <header
        style={{
        height: "60px",
        flexShrink: 0,
        backgroundColor: theme.colours.header,
        color: theme.colours.textLight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0px 20px",
        fontSize: theme.fontSize.header,
        fontWeight: theme.fontWeight.header
      }}>
          
        {/* Dynamic Title */ }
        <h1>{headerTitle || "Dashboard"}</h1>

        {/* Placeholder for login/logout */}
        <div>
          <button
            style={importantButton}
            onClick={signOut}
          >
            Sign out
          </button>
        </div>
      </header>
      {/* End of Header */}


      {/* Middle Section */}
      <div style={{display: "flex", flex: 1, minHeight: 0}}>

        {/* Sidebar */}
        <aside
          style={{
          width: "220px",
          backgroundColor: theme.colours.sidebar,
          color: theme.colours.textLight,
          padding: "20px",
          display: "flex",
          flexDirection: "column"
        }}>

          <h2 style={{
            marginBottom: "20px",
            fontSize: theme.fontSize.header,
            fontWeight: theme.fontWeight.header
          }}>
            {sidebarTitle || SIDEBAR_TITLE}
          </h2>

          <Link href="/" style={sidebarButton}>Home</Link>
          <Link href="/add-customer" style={sidebarButton}>Add Customer</Link>
          <Link href="/customers" style={sidebarButton}>Search Customers</Link>
          <Link href="/finder" style={sidebarButton}>Find Customers</Link>
          <Link href="/add-product" style={sidebarButton}>Add Product</Link>
          <Link href="/products" style={sidebarButton}>Search Products</Link>
        </aside>

        {/* Main Content */}
        <main
          className="children"
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "30px",
            backgroundColor: theme.colours.background
          }}>
          {children}
        </main>
      </div>
      {/* End of Middle Section */}


      {/* Footer */}
      <footer style={footerStyle}>
        {footerText || FOOTER_TEXT}
      </footer>
      {/* End of Footer */}
      
    </div>
  );


      {/* Old layout
      
      <aside style={{
        width: "220px",
        backgroundColor: theme.colours.sidebar,
        color: theme.colours.textLight,
        padding: "20px",
        display: "flex",
        flexDirection: "column"
      }}>
        <h2 style={{
          marginBottom: "20px",
          fontSize: theme.fontSize.header,
          fontWeight: theme.fontWeight.header
        }}>
          {sidebarTitle || SIDEBAR_TITLE}
        </h2>
          <Link href="/" style={sidebarButton}>Home</Link>
          <Link href="/add-customer" style={sidebarButton}>Add Customer</Link>
          <Link href="/customers" style={sidebarButton}>Search Customers</Link>
          <Link href="/finder" style={sidebarButton}>Find Customers</Link>
          <Link href="/add-product" style={sidebarButton}>Add Product</Link>
          <Link href="/products" style={sidebarButton}>Search Products</Link>
      </aside>
      
      <div style={{ flex: 1, display: "flex", flexDirection: "column", backgroundColor: theme.colours.background}}>

        <header style={{
          height: "60px",
          flexShrink: 0,
          backgroundColor: theme.colours.header,
          color: theme.colours.textLight,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0px 20px",
          fontSize: theme.fontSize.header,
          fontWeight: theme.fontWeight.header
        }}>
        
          <h1>{headerTitle || "Dashboard"}</h1>
          
          <div>
            <button
              style={importantButton}
              onClick={signOut}
            >
              Sign out
            </button>
          </div>
        </header>
        
        <main style={{ padding: "30px", overflowY: "auto" }}>{children}</main>
      </div>
      */}
}