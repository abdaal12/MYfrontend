import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const Auth = () => {
  const [view, setView] = useState("login");

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <button
          className={`btn ${view === "login" ? "btn-primary" : "btn-outline-primary"} me-2`}
          onClick={() => setView("login")}
        >
          Login
        </button>
        <button
          className={`btn ${view === "signup" ? "btn-success" : "btn-outline-success"}`}
          onClick={() => setView("signup")}
        >
          Sign Up
        </button>
      </div>

      {view === "login" ? <Login embedded={true} /> : <Signup embedded={true} />}
    </div>
  );
};

export default Auth;
