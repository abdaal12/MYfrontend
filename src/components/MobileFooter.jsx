import React from "react";
import { Link } from "react-router-dom";


const MobileFooter = () => {
  return (
    <div className="d-md-none fixed-bottom bg-light border-top">
      <div className="d-flex justify-content-around py-2">
        <Link to="/" className="text-dark text-center">
          <i className="bi bi-house fs-4"></i>
          <div style={{ fontSize: "0.75rem" }}>Home</div>
        </Link>

        <Link to="/profile" className="text-dark text-center">
          <i className="bi bi-person fs-4"></i>
          <div style={{ fontSize: "0.75rem" }}>Profile</div>
        </Link>

        <Link to="/notifications" className="text-dark text-center">
          <i className="bi bi-bell fs-4"></i>
          <div style={{ fontSize: "0.75rem" }}>Alerts</div>
        </Link>

         <Link to="/chat" className="text-dark text-center">
    <i className="bi bi-chat-dots fs-4"></i> {/* Bootstrap Chat Icon */}
    <div style={{ fontSize: "0.75rem" }}>Chat</div>
  </Link>
      </div>
    </div>
  );
};

export default MobileFooter;
