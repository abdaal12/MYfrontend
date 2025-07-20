import React from "react";
import { useLocation } from "react-router-dom";
import ProductList from "../components/ProductList";

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword");

  const endpoint = `http://localhost:5000/api/products/search?keyword=${keyword}`;

  return (
    <div>
      <h2 className="mb-4 text-center">Search Results for: "{keyword}"</h2>
      <ProductList endpoint={endpoint} />
    </div>
  );
};

export default SearchResults;
