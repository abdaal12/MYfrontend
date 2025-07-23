import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MobileFooter from "../components/MobileFooter";

const API = import.meta.env.VITE_API_URL;
const backendUrl = API.replace("/api", "");

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API}/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
  };

  const handleContactSeller = () => {
    alert(`Contacting seller: ${product?.sellerEmail || "not provided"}`);
  };

  if (!product) {
    return <p className="text-center mt-5">Loading product details...</p>;
  }

  return (
    <div className="container-fluid px-2 px-md-5 pb-5">
      {/* Image Section */}
      <div className="text-center bg-white shadow-sm">
        <img
          className="img-fluid w-100"
          src={
            product.image?.startsWith("http")
              ? product.image
              : `${backendUrl}/uploads/${product.image}`
          }
          alt={product.name}
          style={{ maxHeight: "400px", objectFit: "contain" }}
        />
      </div>

      {/* Product Info */}
      <div className="mt-3 px-2 px-md-4">
        <h4 className="fw-semibold">{product.name}</h4>
        <h5 className="text-success mt-2 mb-1">₹{product.price}</h5>
        <p className="text-muted mb-1">
          <strong>Brand:</strong> {product.brand}
        </p>
        <p className="text-muted mb-1">
          <strong>Category:</strong> {product.category}
        </p>
        <p className="mt-3 text-dark">{product.description}</p>
      </div>

      {/* Bottom Sticky Action Buttons */}
      <div className="position-fixed bottom-0 start-0 end-0 bg-white border-top p-3 d-flex justify-content-around z-3">
        <button className="btn btn-success w-50 me-2" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <button
          className="btn btn-outline-primary w-50"
          onClick={handleContactSeller}
        >
          Contact Seller
        </button>
      </div>

      {/* Extra Space to Avoid Overlap */}
      <div style={{ height: "80px" }}></div>

      <MobileFooter />
    </div>
  );
};

export default ProductDetail;
