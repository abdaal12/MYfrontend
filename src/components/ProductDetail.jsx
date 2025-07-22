import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MobileFooter from "../components/MobileFooter";

const API = import.meta.env.VITE_API_URL;
const backendUrl = API.replace("/api", "");

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
    <div className="container mt-4">
      <h2 className="text-center mb-4">{product.name}</h2>
      <div className="row">
        <div className="col-md-6 text-center">
           <img
          className="card-img-top"
          src={
            product.image?.startsWith("http")
              ? product.image
              : `${backendUrl}${product.image}`
          }
            alt={product.name}
            style={{ maxHeight: "400px", objectFit: "contain" }}
          />
        </div>
        <div className="col-md-6">
          <h4>Price: ₹{product.price}</h4>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p className="mt-3">{product.description}</p>

          <div className="mt-4 d-flex gap-3">
            <button className="btn btn-success" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="btn btn-outline-primary" onClick={handleContactSeller}>
              Contact Seller
            </button>
          </div>
        </div>
      </div>
      <MobileFooter/>
    </div>
  );
};

export default ProductDetail;
