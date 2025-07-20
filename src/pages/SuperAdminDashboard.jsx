import React, { useEffect, useState } from "react";
import axios from "axios";

const SuperAdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

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
        axios.get("http://localhost:5000/api/admin/users", config),
        axios.get("http://localhost:5000/api/admin/products", config),
        axios.get("http://localhost:5000/api/admin/orders", config),
      ]);

      setUsers(userRes.data);
      setProducts(productRes.data);
      setOrders(orderRes.data);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/users/${userId}`,
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

      {/* ORDERS SECTION */}
      <div>
        <h3>All Orders</h3>
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>User</th>
              <th>Products</th>
              <th>Status</th>
              <th>Total Price</th>
              <th>Date/Time</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td>{o.user?.email}</td>
                <td>
                  {o.orderItems.map((item) => (
                    <div key={item._id}>
                      {item.name} (x{item.quantity})
                    </div>
                  ))}
                </td>
                <td>{o.status}</td>
                <td>₹{o.totalPrice}</td>
                <td>{new Date(o.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
