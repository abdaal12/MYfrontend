import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SearchResults from "../pages/SearchResults";
import Profile from "../pages/Profile";
import PrivateRoute from "../routes/PrivateRoutes";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Auth from "../pages/Auth";
import Dashboard from "../pages/Dashboard";
import UpdateProduct from '../components/UpdateProduct';
import ProductDetail from "../components/ProductDetail";
import ChatPage from "../pages/ChatPage";
import LikedProducts from '../pages/LikedProducts';

import SuperAdminDashboard from '../pages/SuperAdminDashboard';



const AppRoutes = () => {
  return (
    <Routes>

          {/* Public Routes */}

      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/search" element={<SearchResults />} />
     <Route path="/auth" element={<Auth />} />
     <Route path="/product/:id" element={<ProductDetail />} />
  <Route path="/chat" element={<ChatPage />} />
 {/* Private Routes */}

   <Route element={<PrivateRoute />}>
  
<Route path="/superadmin/dashboard" element={<SuperAdminDashboard />} />

      <Route path="/liked" element={<LikedProducts />} />
        <Route path="/profile" element={<Profile />} />
       <Route path="/dashboard" element={<Dashboard />} />
       <Route path="/update-product/:id" element={<UpdateProduct />} />

      </Route>

    </Routes>
  );
};

export default AppRoutes;
