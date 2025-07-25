import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MobileFooter from "../components/MobileFooter";


const API = import.meta.env.VITE_API_URL;

const Profile = () => {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
          contact: res.data.contact || "",
          address: res.data.address || "",
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [token]);

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${API}/users/profile`,
        { ...formData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(res.data);
      setEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">User Profile</h2>
      <div className="card p-4 shadow">
        {/* Name */}
        <div>
          <label>Name:</label>
          {editing ? (
            <input
              type="text"
              className="form-control mb-2"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          ) : (
            <p>{user.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label>Email:</label>
          {editing ? (
            <input
              type="email"
              className="form-control mb-2"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          ) : (
            <p>{user.email}</p>
          )}
        </div>

        {/* Contact */}
        <div>
          <label>Contact:</label>
          {editing ? (
            <input
              type="text"
              className="form-control mb-2"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            />
          ) : (
            <p>{user.contact || "Not Provided"}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label>Address: </label>
          {editing ? (
            <textarea
              className="form-control mb-2"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          ) : (
            <p>{user.address || "Not Provided"}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="d-flex gap-3 flex-wrap mt-3">
          {editing ? (
            <>
              <button className="btn btn-success" onClick={handleUpdate}>
                Save
              </button>
              <button className="btn btn-secondary" onClick={() => setEditing(false)}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-warning" onClick={() => setEditing(true)}>
                Edit Profile 🛠️
              </button>

              <button className="btn btn-primary" onClick={() => navigate("/liked")}>
                Liked Products
              </button>

            
                <button className="btn btn-secondary" onClick={() => navigate("/dashboard")}>
                  Go to Dashboard
                </button>
              )}

              {user.role === "superadmin" && (
                <button className="btn btn-dark" onClick={() => navigate("/superadmin/dashboard")}>
                  Super Admin Dashboard
                </button>
              )}

              <button
                className="btn btn-outline-danger d-block d-md-none"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
      <MobileFooter/>
    </div>
  );
};

export default Profile;
