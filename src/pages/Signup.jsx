import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Signup = ({ embedded }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation();

  // Only redirect to "from" if user came from a protected route
  const from = location.state?.from?.pathname;

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users", form);

      localStorage.setItem("token", res.data.token);
      navigate(from || "/", { replace: true }); // ✅ Redirect to original page or home
    } catch (err) {
      alert("Signup failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      {!embedded && <h2 className="text-center mb-3">Sign Up</h2>}
      <form onSubmit={handleSignup}>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit" className="btn btn-success w-100">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
