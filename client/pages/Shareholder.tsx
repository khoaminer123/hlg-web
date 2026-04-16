import React from "react";
import { useAuth } from "../context/AuthContext";
import ShareholderDashboard from "../components/ShareholderDashboard";
import ShareholderAuth from "../components/ShareholderAuth";

const Shareholder: React.FC = () => {

  const { user } = useAuth();

  if (!user || user.role === 'admin') {
    return <ShareholderAuth />;
  }

  return <ShareholderDashboard />;
};

export default Shareholder;