import React, { useState } from "react";
import MyProducts from "../components/MyProducts";
import AddProduct from "../components/AddProduct";

const Dashboard = () => {
  const [section, setSection] = useState("products");

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">Your Dashboard</h2>

      <div className="d-flex justify-content-center gap-2 mb-4 flex-wrap">
<<<<<<< HEAD
        <button className="btn btn-outline-primary" onClick={() => setSection("products")}>My Products</button>
        <button className="btn btn-outline-success" onClick={() => setSection("add")}>Add Product</button>
        
=======
        <button
          className="btn btn-outline-primary"
          onClick={() => setSection("products")}
        >
          My Products
        </button>
        <button
          className="btn btn-outline-success"
          onClick={() => setSection("add")}
        >
          Add Product
        </button>
>>>>>>> 6a234b294e30f4762a9b3b0c6edcd1579c3b8655
      </div>

      {section === "products" && <MyProducts />}
      {section === "add" && <AddProduct />}
<<<<<<< HEAD
    
    
=======
>>>>>>> 6a234b294e30f4762a9b3b0c6edcd1579c3b8655
    </div>
  );
};

export default Dashboard;
