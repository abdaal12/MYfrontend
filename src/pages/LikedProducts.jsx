import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductDetail from "../components/ProductDetail"
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
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchLikedProducts();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Liked Products</h3>
      <div className="row">
        {products.map(product => (
          <div key={product._id} className="col-md-4 mb-3">
            <ProductDetail product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikedProducts;
