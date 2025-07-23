import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal"; // You must install and import Bootstrap CSS

const backendUrl = import.meta.env.VITE_API_URL.replace("/api", "");

const ProductCardMinimal = ({ product }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const imageUrl = product.image?.startsWith("http")
    ? product.image
    : `${backendUrl}${product.image}`;

  return (
    <>
      <div className="col-6 col-md-3 mb-4">
        <div className="card h-100 shadow-sm" style={{ cursor: "pointer" }}>
          <img
            className="card-img-top"
            src={imageUrl}
            alt={product.name}
            style={{ height: "200px", objectFit: "cover" }}
            onClick={() => setShowModal(true)}
          />
          <div
            className="card-body text-center"
            onClick={() => navigate(`/product/${product._id}`)}
          >
            <h6 className="card-title text-truncate">{product.name}</h6>
            <p className="mb-2 fw-bold text-success">₹{product.price}</p>
            <div>
              {"★".repeat(4)}
              <span className="text-muted">★</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for full-screen image */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Body className="p-0">
          <img
            src={imageUrl}
            alt={product.name}
            className="img-fluid w-100"
            style={{ maxHeight: "90vh", objectFit: "contain" }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductCardMinimal;
