import React, { useState } from "react";
import axios from "axios";

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
      formData.append("image", imageFile);

      await axios.post("http://localhost:5000/api/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Product added successfully!");
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
      window.scrollTo(0, 0); // ✅ Auto scroll up
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4 className="mb-3">Add New Product</h4>

      <input
        type="text"
        className="form-control mb-2"
        name="name"
        placeholder="Product Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <textarea
        className="form-control mb-2"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        className="form-control mb-2"
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        min="1"
        step="0.01"
        required
      />

      <input
        type="text"
        className="form-control mb-2"
        name="brand"
        placeholder="Brand"
        value={form.brand}
        onChange={handleChange}
        required
      />

      <select
        className="form-select mb-2"
        name="category"
        value={form.category}
        onChange={handleChange}
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
        className="form-control mb-2"
        name="countInStock"
        placeholder="Stock Count"
        value={form.countInStock}
        onChange={handleChange}
        min="0"
        required
      />

      <input
        type="file"
        className="form-control mb-2"
        accept="image/*"
        onChange={handleImageChange}
        required
      />

      {/* ✅ Preview image */}
      {imagePreview && (
        <div className="mb-3">
          <img src={imagePreview} alt="Preview" className="img-fluid rounded shadow-sm" style={{ maxHeight: "200px" }} />
        </div>
      )}

      <button type="submit" className="btn btn-success w-100" disabled={loading}>
        {loading ? "Submitting..." : "Add Product"}
      </button>
    </form>
  );
};

export default AddProduct;
