import React, { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const categories = ["Electronics", "Food", "Shoes", "Clothing", "Beauty", "Books"];

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    brand: "",
    category: "",
    countInStock: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const validateForm = () => {
    if (!form.name || !form.description || !form.price || !form.brand || !form.category || !form.countInStock) {
      alert("Please fill all fields.");
      return false;
    }

    if (parseFloat(form.price) <= 0 || parseInt(form.countInStock) < 0) {
      alert("Invalid price or stock value.");
      return false;
    }

    if (!imageFile) {
      alert("Please upload an image.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      formData.append("image", imageFile); // ✅ Must match multer field name

      const res = await axios.post(`${API}/products`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
         
        },
      });

      alert("✅ Product added successfully!");
      console.log(res.data);

      // Reset form
      setForm({
        name: "",
        description: "",
        price: "",
        brand: "",
        category: "",
        countInStock: "",
      });
      setImageFile(null);
      setImagePreview(null);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Product creation failed:", error.response?.data || error);
      alert("❌ Error creating product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h4 className="mb-3">Add New Product</h4>

      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        className="form-control mb-2"
        placeholder="Product Name"
        required
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        className="form-control mb-2"
        placeholder="Description"
        required
      />

      <input
        type="number"
        name="price"
        value={form.price}
        onChange={handleChange}
        className="form-control mb-2"
        placeholder="Price"
        min="1"
        step="0.01"
        required
      />

      <input
        type="text"
        name="brand"
        value={form.brand}
        onChange={handleChange}
        className="form-control mb-2"
        placeholder="Brand"
        required
      />

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="form-select mb-2"
        required
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="number"
        name="countInStock"
        value={form.countInStock}
        onChange={handleChange}
        className="form-control mb-2"
        placeholder="Stock Count"
        min="0"
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="form-control mb-2"
        required
      />

      {imagePreview && (
        <div className="mb-3">
          <img
            src={imagePreview}
            alt="Preview"
            className="img-fluid rounded shadow-sm"
            style={{ maxHeight: "200px" }}
          />
        </div>
      )}

      <button type="submit" className="btn btn-success w-100" disabled={loading}>
        {loading ? "Submitting..." : "Add Product"}
      </button>
    </form>
  );
};

export default AddProduct;
