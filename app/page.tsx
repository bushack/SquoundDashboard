"use client"; 

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { inputStyleStretch, primaryButton200 } from "@/styles/ui" 


export default function SignInPage() { 
  
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);

  
  // Sign-in.
  const signIn = async () => {
    if (!userEmail || !userPassword) {
      alert("Please enter an email address and password"); 
      return;
    }

    try {
      setLoading(true);
      
      const { error } = await supabase.auth.signInWithPassword({
        email: userEmail.trim(),
        password: userPassword
      });
      
      if (error) {
        alert(error.message);
      } else {
        router.push("/customers");
      }
    } finally {
      setLoading(false);
    }
  };
  
  
  // Runs when page loads.
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      
      if (data.user) {
        router.push("/customers");
      }
    };
    
    getUser();
  }, [router]); 
  
  
  return ( 
    <div
      style={{display: "flex", flexWrap: "wrap", justifyContent: "center",
      height: "100dvh", alignItems: "center", backgroundColor: "#ccc"}}>
        
      <form
        name="UserSignInForm"
        onSubmit={(e) => {e.preventDefault(); signIn();}}
        style={{fontSize: "14px", color: "#555"}}
      >

        {/* Email input */}
        <p>
          Email:
          <input
            type="email"
            placeholder="Enter email address"
            style={{...inputStyleStretch}}
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </p>
        
        {/* Password input */}
        <p
          style={{marginBottom: "30px"}}
        >
          Password:
          <input
            type="password"
            placeholder="Enter password"
            style={{...inputStyleStretch}}
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </p>

        {/* Sign-in button */}
        <p>
          <button
            type="submit"
            disabled={loading}
            style={{...primaryButton200, width: "100%", backgroundColor: "#eb501c", color: "white"}}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </p>
      </form>
    </div>
  );
}