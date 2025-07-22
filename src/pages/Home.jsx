import MobileFooter from "../components/MobileFooter";
import ProductList from "../components/ProductList";

const Home = () => {
  const backendUrl = import.meta.env.VITE_API_URL;

  return (
    <div className="container-fluid pt-2">
      <h2 className="text-center">Our Products</h2>
      <ProductList endpoint={`${backendUrl}/products`} />
      <MobileFooter />
    </div>
  );
};

export default Home;
