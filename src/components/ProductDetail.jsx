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
  const [showContactOptions, setShowContactOptions] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API}/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <div className="row">
          {/* Image Section */}
          <div className="col-md-6 text-center">
            <img
              src={product.image.startsWith("http") ? product.image : `${backendUrl}/${product.image}`}
              alt={product.name}
              className="img-fluid rounded"
              style={{ maxHeight: "400px", objectFit: "contain" }}
            />
          </div>

          {/* Product Details */}
          <div className="col-md-6">
            <h2>{product.name}</h2>
            <p className="text-muted">{product.brand}</p>
            <h4 className="text-success">₹{product.price}</h4>
            <p>{product.description}</p>

            <div className="mt-3 d-flex flex-column gap-2">
              {/* Add to Cart */}
              <button className="btn btn-warning">🛒 Add to Cart</button>

              {/* Buy Now */}
              <button className="btn btn-success">🚀 Buy Now</button>

              {/* Contact Options Button */}
              <div className="position-relative">
                <button
                  className="btn btn-outline-primary w-100"
                  onClick={() => setShowContactOptions(!showContactOptions)}
                >
                  📞 Contact
                </button>

                {showContactOptions && (
                  <div
                    className="position-absolute bg-white border rounded p-2 shadow-sm mt-2 w-100"
                    style={{ zIndex: 999 }}
                  >
                    <button
                      className="btn btn-sm btn-outline-primary w-100 mb-2"
                      onClick={() => {
                        navigate(`/chat/${product.sellerId}`);
                      }}
                    >
                      💬 Chat with Owner
                    </button>

                    <a
                      href={`https://wa.me/${product.sellerPhone || ""}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-success w-100"
                    >
                      📱 WhatsApp
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <MobileFooter />
    </div>
  );
};

export default ProductDetail;
