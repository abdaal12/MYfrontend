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
  const [preview, setPreview] = useState(null);
  const [fullScreenImage, setFullScreenImage] = useState(null); // for modal

  const token = localStorage.getItem("token");

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

    if (!image) {
      alert("Please upload an image.");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    data.append("image", image);

    try {
      const response = await axios.post(`${API}/products`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("✅ Product created!");
      setFormData({
        name: "",
        brand: "",
        category: "",
        description: "",
        price: "",
        countInStock: "",
      });
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("❌ Upload failed.");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add Product</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-2">
          <label>Name:</label>
          <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <label>Brand:</label>
          <input type="text" name="brand" className="form-control" value={formData.brand} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <label>Category:</label>
          <input type="text" name="category" className="form-control" value={formData.category} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <label>Description:</label>
          <textarea name="description" className="form-control" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <label>Price:</label>
          <input type="number" name="price" className="form-control" value={formData.price} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <label>Count In Stock:</label>
          <input type="number" name="countInStock" className="form-control" value={formData.countInStock} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Image:</label>
          <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} required />
        </div>

        {preview && (
          <div>
            <img
              src={preview}
              alt="Preview"
              onClick={() => setFullScreenImage(preview)}
              style={{ height: "150px", cursor: "zoom-in", borderRadius: "10px" }}
            />
          </div>
        )}

        <button type="submit" className="btn btn-primary mt-3">Add Product</button>
      </form>

      {/* Fullscreen Image Modal */}
      {fullScreenImage && (
        <div
          onClick={() => setFullScreenImage(null)}
          style={{
            position: "fixed",
            top: 0, left: 0,
            width: "100vw", height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            display: "flex", justifyContent: "center", alignItems: "center",
            zIndex: 9999,
            cursor: "zoom-out"
          }}
        >
          <img src={fullScreenImage} alt="Fullscreen" style={{ maxHeight: "90%", maxWidth: "90%", borderRadius: "10px" }} />
        </div>
      )}
    </div>
  );
};

export default AddProduct;
