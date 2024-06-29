import { Navigate, Outlet } from "react-router-dom";
import NavBar from "./NavBar2";

const PrivateRoute = () => {
  const isLogin = localStorage.getItem("islogin");
  // if (!isLogin) return <Navigate to="/signin" />;
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default PrivateRoute;