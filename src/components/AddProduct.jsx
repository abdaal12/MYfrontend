import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const API = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    description: "",
    price: "",
    countInStock: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();
    submitData.append("image", image);
    Object.entries(formData).forEach(([key, value]) =>
      submitData.append(key, value)
    );

    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.post(`${API}/products`, submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product created successfully!");
      console.log(data); // optional
    } catch (error) {
      console.error("Product creation failed:", error.response?.data || error);
      alert("Error creating product.");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add New Product</h3>
      <form onSubmit={handleSubmit}>
        {/* Text Inputs */}
        {["name", "brand", "category", "description", "price", "countInStock"].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label">{field}</label>
            <input
              type={field === "price" || field === "countInStock" ? "number" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        ))}

        {/* Image Upload */}
        <div className="mb-3">
          <label className="form-label">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="form-control"
            required
          />
        </div>

        {/* Image Preview */}
        {preview && (
          <div className="mb-3">
            <img src={preview} alt="Preview" width="200" />
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
