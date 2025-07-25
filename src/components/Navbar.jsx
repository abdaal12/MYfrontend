import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSearch = () => {
    const trimmedSearch = search.trim();
    if (trimmedSearch) {
      navigate(`/search?keyword=${trimmedSearch}`);
      setSearch("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  return (
    <nav className="bg-dark py-2">
      <div className="container d-flex align-items-center justify-content-between flex-nowrap gap-2">
        {/* Logo */}
       <Link to="/" className="text-white fw-bold text-decoration-none" style={{ minWidth: "80px" }}>
  MyShop
</Link>

        {/* Search Input */}
        <input
          type="text"
          className="form-control"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          style={{ flexGrow: 1 }}
        />

        {/* Search Button */}
        <button className="btn btn-primary ms-2" onClick={handleSearch}>
          Search
        </button>

        {/* Auth Links - Only for large screens */}
        <div className="d-none d-md-flex align-items-center gap-2 ms-3">
          {token ? (
            <>
              {/* ✅ New Profile button only on large screens */}
              <Link to="/profile" className="btn btn-outline-light btn-sm">
                Profile
              </Link>
              <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/auth" className="btn btn-outline-light btn-sm">
                Login
              </Link>
              <Link to="/auth" className="btn btn-outline-light btn-sm">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
