import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    description: "",
    price: "",
    countInStock: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image.");
      return;
    }

    const data = new FormData();
    data.append("image", image);

    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post(`${API}/products`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product created!");
      console.log("Created Product:", response.data);
    } catch (error) {
      console.error("Product creation failed:", error);
      alert("Product creation failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm rounded">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" name="name" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Brand</label>
          <input type="text" name="brand" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select name="category" className="form-select" onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Shoes">Shoes</option>
            <option value="Food">Food</option>
            <option value="Books">Books</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <input type="text" name="description" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" name="price" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Stock Count</label>
          <input type="number" name="countInStock" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Product Image</label>
          <input type="file" accept="image/*" className="form-control" onChange={handleImageChange} required />
        </div>

        <button type="submit" className="btn btn-primary w-100">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
