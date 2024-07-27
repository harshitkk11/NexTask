import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./NavBar2";

const PrivateRoute = () => {
  const isLogedIn = localStorage.getItem("islogedin");

  if (!isLogedIn) {
    return <Navigate to="/signin" />;
  }

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default PrivateRoute;
