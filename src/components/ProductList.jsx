import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCardMinimal from "./ProductCardMinimal";


const ProductList = ({ endpoint }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(endpoint)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Product fetching error:", err));
  }, [endpoint]);

  if (products.length === 0) {
    return <p className="text-center">No products found.</p>;
  }

  return (
    <div className="row">
      {products.map((product) => (
        <ProductCardMinimal key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
