"use client";

import { useState, useEffect } from "react" 
import { supabase } from "../../lib/supabaseClient"

export default function LoginPage() {

  const [user, setUser] = useState<any>(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");


  // User sign-up
  const signUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: loginEmail,
      password: loginPassword
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Check your email to confirm signup");
    }
  };


  // User sign-in
  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword
    });

    if (error) {
      alert(error.message);
    } else {
      setUser(data.user);
    }
  };


  // User sign-out
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };


  // Runs when page loads
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
  }, []);


  // User interface
  return (
    <div style={{ padding: "10px 50px" }}>

    {!user ? (
      <div style={{ marginBottom: "50px" }}>
        <h2 style={{ marginLeft: "5px", marginBottom: "10px"}}>User Login</h2>

        <div>
          <input
            type="email"
            placeholder="Email"
            style={{ margin: "5px", width: "25%;", padding: "2px", color: "black" }}
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            style={{ margin: "5px", width: "25%;", padding: "2px", color: "black" }}
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
        </div>
        
        <div>
          <button
            onClick={signIn}
            style={{margin: "10px 5px 5px 5px", width: "25%;", padding: "15px", backgroundColor: "green", color: "white"}}>Sign In
          </button>
        </div>

        <div>
          <button
            onClick={signUp}
            style={{margin: "5px 5px 10px 5px", width: "25%;", padding: "15px", backgroundColor: "grey", color: "white"}}>Sign Up
          </button>
        </div>
      </div>
    ) : (
      <div style={{ marginBottom: "20px" }}>
        <p>Logged in as; { user.email }</p>
        <button onClick={signOut}>Sign Out</button>
      </div>
    )}
    </div>)
  }