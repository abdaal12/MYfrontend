import React, { useEffect, useState } from "react";
import axios from "axios";
import MobileFooter from "../components/MobileFooter";

const API = import.meta.env.VITE_API_URL;

const SuperAdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);


  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [userRes, productRes, orderRes] = await Promise.all([
        axios.get(`${API}/admin/users`, config),
        axios.get(`${API}/admin/products`, config),
      
      ]);

      setUsers(userRes.data);
      setProducts(productRes.data);
      
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(
        `${API}/admin/users/${userId}`,
        { role: newRole },
        config
      );
      alert(`User role updated to ${newRole}`);
      fetchAllData();
    } catch (error) {
      console.error("Role update failed:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Super Admin Dashboard</h1>

      {/* USERS SECTION */}
      <div className="mb-5">
        <h3>All Users</h3>
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Change Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <select
                    className="form-select"
                    value={u.role}
                    onChange={(e) => handleRoleChange(u._id, e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="vendor">Vendor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PRODUCTS SECTION */}
      <div className="mb-5">
        <h3>All Products</h3>
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Vendor</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>₹{p.price}</td>
                <td>{p.sellerEmail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <MobileFooter/>
    </div>
  );
};

export default SuperAdminDashboard;
