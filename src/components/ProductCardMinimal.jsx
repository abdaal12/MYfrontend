import React from "react";
import { useNavigate } from "react-router-dom";

const backendUrl = "http://localhost:5000";

const ProductCardMinimal = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product._id}`); // Make sure _id exists
  };

  return (
    <div className="col-6 col-md-3 mb-4">
      <div
        className="card h-100 shadow-sm cursor-pointer"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
        <img
          className="card-img-top"
          src={
            product.image?.startsWith("http")
              ? product.image
              : `${backendUrl}${product.image}`
          }
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
