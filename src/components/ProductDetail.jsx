import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MobileFooter from "../components/MobileFooter";

const API = import.meta.env.VITE_API_URL;
const backendUrl = API.replace("/api", "");

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    return imagePath.startsWith("http")
      ? imagePath
      : `${backendUrl}${imagePath}`;
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
          src={getImageUrl(product.image)}
          alt={product.name}
          style={{ maxHeight: "400px", objectFit: "contain", cursor: "zoom-in" }}
          onClick={() => setShowModal(true)}
        />
      </div>

      {/* Modal for Fullscreen Image */}
      {showModal && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          role="dialog"
          onClick={() => setShowModal(false)}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content bg-transparent border-0">
              <img
                src={getImageUrl(product.image)}
                alt={product.name}
                className="img-fluid rounded"
                style={{ maxHeight: "90vh", objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      )}

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
 {/* Action Buttons - Like, Share, Contact Seller */}
<div className="d-flex justify-content-around mt-4 px-2 gap-2">
  <button
    className="btn btn-outline-danger flex-grow-1"
    onClick={async () => {
      try {
        const res = await axios.put(`${API}/products/like/${product._id}`);
        setProduct({ ...product, likes: res.data.likes });
      } catch (err) {
        console.error("Like failed:", err);
      }
    }}
  >
    ❤️ Like ({product.likes || 0})
  </button>

  <button
    className="btn btn-outline-secondary flex-grow-1"
    onClick={() => {
      const shareUrl = `${window.location.origin}/product/${product._id}`;
      navigator.clipboard.writeText(shareUrl);
      alert("Product link copied to clipboard!");
    }}
  >
    🔗 Share
  </button>

  <button
    className="btn btn-outline-primary flex-grow-1"
    onClick={handleContactSeller}
  >
    📞 Contact
  </button>
</div>


      {/* Extra Space to Avoid Overlap */}
      <div style={{ height: "80px" }}></div>

      <MobileFooter />
    </div>
  );
};

export default ProductDetail;
