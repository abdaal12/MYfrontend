import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

const API = import.meta.env.VITE_API_URL;
const backendUrl = API.replace("/api", "");

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchProducts = () => {
    axios
      .get(`${API}/products/my/products`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Fetch error:", err));
  };

  useEffect(fetchProducts, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    try {
      await axios.delete(`${API}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete product");
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image.startsWith("http") ? image : `${backendUrl}${image}`);
    setShowModal(true);
  };

  return (
    <div>
      <h4 className="mb-4">Your Products</h4>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-3" key={product._id}>
            <div className="card p-2 h-100">
              <img
                src={
                  product.image?.startsWith("http")
                    ? product.image
                    : `${backendUrl}${product.image}`
                }
                alt={product.name}
                className="img-fluid mb-2"
                style={{ height: "200px", objectFit: "cover", width: "100%", cursor: "pointer" }}
                onClick={() => handleImageClick(product.image)}
              />
              <h5>{product.name}</h5>
              <p>₹{product.price}</p>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => navigate(`/update-product/${product._id}`)}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Fullscreen Image Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Body className="text-center p-0">
          <img
            src={selectedImage}
            alt="Full Size"
            className="img-fluid"
            style={{ width: "100%", maxHeight: "90vh", objectFit: "contain" }}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MyProducts;
