import React, { useState } from "react";
import MyProducts from "../components/MyProducts";
import AddProduct from "../components/AddProduct";



const Dashboard = () => {
  const [section, setSection] = useState("products");

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">Your Dashboard>

      <div className="d-flex justify-content-center gap-2 mb-4 flex-wrap">
        <button className="btn btn-outline-primary" onClick={() => setSection("products")}>My Products</button>
        <button className="btn btn-outline-success" onClick={() => setSection("add")}>Add Product</button>
      </div>

      {section === "products" && <MyProducts />}
      {section === "add" && <AddProduct />}
    </div>
  );
};

export default Dashboard;
