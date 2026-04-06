import React from "react";
import { useAuth } from "../context/AuthContext";
import ShareholderDashboard from "../components/ShareholderDashboard";
import ShareholderAuth from "../components/ShareholderAuth";

const Shareholder: React.FC = () => {

  const { user } = useAuth();

  if (!user) {
    return <ShareholderAuth />;
  }

  return <ShareholderDashboard />;
};

export default Shareholder;