import MobileFooter from "../components/MobileFooter";
import ProductList from "../components/ProductList";

const Home = () => {
  return (
    <div className="container-fluid pt-2">
      <h2 className="text-center">Our Products</h2>
      <ProductList endpoint="http://localhost:5000/api/products" />
      <MobileFooter />
    </div>
  );
};

export default Home;
