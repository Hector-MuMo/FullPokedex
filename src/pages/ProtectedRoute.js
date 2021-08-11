import React from "react";
import { Redirect, Route } from "react-router";
import { useAuth } from "../Context/DataContext";

const ProtectedRoute = ({ children, ...props }) => {
  const { trainer } = useAuth();

  if (trainer) {
    return <Route {...props}>{children}</Route>;
  }

  return <Redirect to="/" />;
};

export default ProtectedRoute;
