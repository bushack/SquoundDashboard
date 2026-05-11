"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";
import { importantButton, dangerButton, footerStyle, headerStyle, primaryButton, sidebarButton } from "@/styles/ui";
import { theme } from "@/styles/themes"

import { FOOTER_TEXT, HEADER_TEXT, SIDEBAR_TITLE } from "@/config/app";
import { MESSAGES } from "@/constants/messages";

import { DialogProvider, useDialog } from "@/context/dialogContext";


type LayoutProps = {
  children: ReactNode;
  headerText?: string;
  sidebarTitle?: string;
  footerText?: string;
};


export default function Layout({ children, headerText, sidebarTitle, footerText }: LayoutProps) {

  const router = useRouter();

  const { showDialog } = useDialog();


  const handleSignOut = async () => {

    showDialog({
      title: MESSAGES.SIGN_OUT_TITLE,
      message: MESSAGES.SIGN_OUT_MSG,
      onConfirm: async () => {
        try {
          await supabase.auth.signOut();
          router.push("../");
          // TODO: Currently only returning to login page here. Improve?
        } catch {
          // TODO: Handle sign out error?
          console.error(MESSAGES.SIGN_OUT_ERROR, error);
        }
      },
    });
  };


  return (
    
    <div style={{display: "flex", flexDirection: "column", height: "100vh"}}>

      {/* Header */}
      <header style={headerStyle}>
          
        {/* Text */ }
        <h1>{headerText || HEADER_TEXT}</h1>
      </header>
      {/* End of Header */}


      {/* Main Section */}
      <div style={{display: "flex", flex: 1, minHeight: 0}}>

        {/* Sidebar */}
        <aside style={{
          width: "220px",
          backgroundColor: theme.colours.sidebar,
          color: theme.colours.textLight,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}>

          <div style={{
            display: "flex",
            flexDirection: "column",
          }}>

            <h3 style={{
              fontSize: theme.fontSize.header,
              fontWeight: theme.fontWeight.header
            }}>
              {sidebarTitle || SIDEBAR_TITLE}
            </h3>

            <Link href="/" style={sidebarButton}>Home</Link>
            <Link href="/add-customer" style={sidebarButton}>Add Customer</Link>
            <Link href="/customers" style={sidebarButton}>Search Customers</Link>
            <Link href="/finder" style={sidebarButton}>Find Customers</Link>
            <Link href="/add-product" style={sidebarButton}>Add Product</Link>
            <Link href="/products" style={sidebarButton}>Search Products</Link>
          </div>

          <div>
            <button
              style={{...importantButton, width: "100%"}}
              onClick={handleSignOut}
            >
              Sign out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main
          className="children"
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px 30px",
            backgroundColor: theme.colours.background
          }}>
          {children}
        </main>
      </div>
      {/* End of Main Section */}


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