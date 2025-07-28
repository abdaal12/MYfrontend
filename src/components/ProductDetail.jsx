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
  const [showModal, setShowModal] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showContactOptions, setShowContactOptions] = useState(false);

  const userId = localStorage.getItem("userId"); // Assuming you save it on login

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

  const handleContactSeller = () => {
    setShowContactOptions(!showContactOptions);
  };

  const handleStartChat = () => {
    if (!userId || !product?.sellerId) return;
    if (userId === product.sellerId) {
      alert("This is your own product.");
      return;
    }
    navigate(`/chat/${product.sellerId}`);
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    return imagePath.startsWith("http") ? imagePath : `${backendUrl}${imagePath}`;
  };

  const handleLike = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(`${API}/products/like/${product._id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProduct({ ...product, likes: res.data.likes });
    } catch (err) {
      alert(err.response?.data?.message || "You can like only once.");
    }
  };

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}/products/${product._id}`;
    navigator.clipboard.writeText(shareUrl);
    alert("Product link copied to clipboard!");
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

      {/* Action Buttons - Like, Share, Contact */}
      <div className="d-flex justify-content-around mt-4 px-2 gap-2 position-relative">
        <button className="btn btn-outline-danger flex-grow-1" onClick={handleLike}>
          ❤️ Like ({product.likes || 0})
        </button>

        <button
          className="btn btn-outline-secondary flex-grow-1"
          onClick={() => setShowShareOptions(!showShareOptions)}
        >
          🔗 Share
        </button>

        <div className="flex-grow-1">
          <button
            className="btn btn-outline-primary w-100"
            onClick={handleContactSeller}
          >
            📞 Contact
          </button>

          {/* Contact Options Dropdown */}
          {showContactOptions && (
            <div className="bg-light border rounded mt-2 p-2 shadow-sm text-center">
              {product.sellerId && (
                <button
                  className="btn btn-sm btn-outline-primary w-100 mb-2"
                  onClick={handleStartChat}
                >
                  💬 Chat with Owner
                </button>
              )}
              {product.sellerPhone && (
                <a
                  href={`https://wa.me/${product.sellerPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-success w-100"
                >
                  📱 WhatsApp
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Social Share Options */}
      {showShareOptions && (
        <div className="mt-3 p-3 border rounded bg-light text-center">
          <h6 className="mb-3">📱 Share to:</h6>
          <div className="d-flex justify-content-around flex-wrap gap-2">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `${product.name} - ${window.location.origin}/product/${product._id}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success"
            >
              WhatsApp
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                `${window.location.origin}/product/${product._id}`
              )}&text=${encodeURIComponent(product.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-info text-white"
            >
              Twitter
            </a>
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(
                `${window.location.origin}/product/${product._id}`
              )}&text=${encodeURIComponent(product.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Telegram
            </a>
            <button className="btn btn-dark" onClick={handleCopyLink}>
              📋 Copy Link
            </button>
          </div>
        </div>
      )}

      <div style={{ height: "60px" }}></div>
      <MobileFooter />
    </div>
  );
};

export default ProductDetail;
