import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCardMinimal from "../components/ProductCardMinimal";
import { useNavigate } from 'react-router-dom';

const LikedProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchLikedProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/liked`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(res.data.likedProducts || []); // Ensure it's an array
    } catch (err) {
      console.error("Error fetching liked products:", err);
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchLikedProducts();
  }, []);

  return (
    <div className="container mt-4">
      <h3>❤️ Liked Products</h3>
      <div className="row">
        {products.length === 0 ? (
          <p className="text-muted mt-3">No liked products found.</p>
        ) : (
          products.map((product) => (
            <ProductCardMinimal key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default LikedProducts;
