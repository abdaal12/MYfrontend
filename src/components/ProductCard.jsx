import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={product.image}
          className="card-img-top"
          alt={product.name}
          style={{ height: "250px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text text-truncate">{product.description}</p>
          <div className="mt-auto">
            <p className="fw-bold text-success">₹{product.price}</p>
            <div className="d-flex justify-content-between">
              <button className="btn btn-sm btn-outline-primary">Add to Cart</button>
              <button className="btn btn-sm btn-success">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
