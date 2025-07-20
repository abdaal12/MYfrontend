import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams(); // Product ID from URL
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    brand: "",
    category: "",
    countInStock: "",
    image: "",
  });

  const [previewImage, setPreviewImage] = useState("");

  // Fetch existing product
 useEffect(() => {
  axios
    .get(`http://localhost:5000/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setForm({
        name: res.data.name,
        description: res.data.description,
        price: res.data.price,
        brand: res.data.brand,
        category: res.data.category,
        countInStock: res.data.countInStock,
        image: res.data.image,
      });
      setPreviewImage(res.data.image);
    })
    .catch((err) => console.error("Fetch product error:", err));
}, [id]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Product updated successfully");
      navigate("/dashboard"); // or any route you want
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update product");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-3">Update Product</h3>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <input
          type="text"
          className="form-control mb-3"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <textarea
          className="form-control mb-3"
          name="description"
          placeholder="Description"
          rows="3"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          className="form-control mb-3"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          className="form-control mb-3"
          name="brand"
          placeholder="Brand"
          value={form.brand}
          onChange={handleChange}
        />

        <select
          name="category"
          className="form-select mb-3"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Shoes">Shoes</option>
          <option value="Beauty">Beauty</option>
        </select>

        <input
          type="number"
          className="form-control mb-3"
          name="countInStock"
          placeholder="Stock Quantity"
          value={form.countInStock}
          onChange={handleChange}
        />

        <label className="mb-1">Product Image:</label>
        <input
          type="file"
          className="form-control mb-3"
          accept="image/*"
          onChange={handleImageChange}
        />

        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            style={{ maxWidth: "150px", marginBottom: "15px" }}
          />
        )}

        <button type="submit" className="btn btn-primary w-100">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
