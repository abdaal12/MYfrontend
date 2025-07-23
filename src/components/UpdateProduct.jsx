import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;
const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL; // preset endpoint
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const UpdateProduct = () => {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API}/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setForm({
          name: res.data.name || "",
          description: res.data.description || "",
          price: res.data.price || "",
          brand: res.data.brand || "",
          category: res.data.category || "",
          countInStock: res.data.countInStock || "",
          image: res.data.image || "",
        });

        setPreviewImage(res.data.image || "");
      } catch (err) {
        console.error("Error fetching product:", err);
        alert("Failed to fetch product details");
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await axios.post(CLOUDINARY_URL, formData);
      const imageUrl = res.data.secure_url;
      setForm((prev) => ({ ...prev, image: imageUrl }));
      setPreviewImage(imageUrl);
    } catch (err) {
      console.error("Cloudinary Upload Error:", err);
      alert("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${API}/products/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Product updated successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
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
            className="img-thumbnail mb-3"
            style={{ maxWidth: "150px" }}
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
