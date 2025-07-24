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
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="text" name="brand" placeholder="Brand" onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
        <input type="number" name="countInStock" placeholder="Stock Count" onChange={handleChange} required />

        <input type="file" accept="image/*" onChange={handleImageChange} required />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
