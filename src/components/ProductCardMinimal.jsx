import React from "react";
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_API_URL.replace("/api", "");

const ProductCardMinimal = ({ product }) => {
  const navigate = useNavigate();

  const imageUrl = product.image?.startsWith("http")
    ? product.image
    : `${backendUrl}${product.image}`;

  return (
    <div className="col-6 col-md-3 mb-4">
      <div
        className="card h-100 shadow-sm"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/product/${product._id}`)}
      >
        <img
          className="card-img-top"
          src={imageUrl}
          alt={product.name}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body text-center">
          <h6 className="card-title text-truncate">{product.name}</h6>
          <p className="mb-2 fw-bold text-success">₹{product.price}</p>
          <div>
            {"★".repeat(4)}
            <span className="text-muted">★</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardMinimal;
