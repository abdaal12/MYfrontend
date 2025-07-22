import React, { useState } from "react";
import MyProducts from "../components/MyProducts";
import AddProduct from "../components/AddProduct";
import OrdersList from "../components/OrdersList";
import MobileFooter from "../components/MobileFooter";

const Dashboard = () => {
  const [section, setSection] = useState("products");

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">Vendor / Admin Dashboard</h2>

      <div className="d-flex justify-content-center gap-2 mb-4 flex-wrap">
        <button className="btn btn-outline-primary" onClick={() => setSection("products")}>My Products</button>
        <button className="btn btn-outline-success" onClick={() => setSection("add")}>Add Product</button>
        <button className="btn btn-outline-warning" onClick={() => setSection("orders")}>Orders</button>
      </div>

      {section === "products" && <MyProducts />}
      {section === "add" && <AddProduct />}
      {section === "orders" && <OrdersList />}
      <MobileFooter/>
    </div>
  );
};

export default Dashboard;
