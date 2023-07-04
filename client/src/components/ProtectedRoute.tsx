import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import React, { PropsWithChildren } from "react";
import { toast } from "react-toastify";

interface Props extends PropsWithChildren {}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    toast.error("Log in to use the website");
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
