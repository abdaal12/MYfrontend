import React, { useEffect, useState } from "react";
import axios from "axios";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  const fetchOrders = () => {
    axios.get("http://localhost:5000/api/orders", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  };

  useEffect(fetchOrders, []);

  const updateStatus = (id, status) => {
    axios.put(`http://localhost:5000/api/orders/${id}/status`, { status }, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => fetchOrders())
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h4>All Orders</h4>
      {orders.map(order => (
        <div key={order._id} className="card p-3 mb-2">
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <select
            className="form-select w-auto"
            value={order.status}
            onChange={(e) => updateStatus(order._id, e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default OrdersList;
