import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import DataProvider from "./hooks/DataProvider";
import Verify from "./pages/Verify";
import ForgotPassword from "./pages/ForgotPassword";
import Reset from "./pages/Reset";
import Board from "./pages/Board";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="min-h-[100vh] w-[100%]">
      <ToastContainer
        position="top-right"
        autoClose={30000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Flip
      />
      <div className="pages">
        <DataProvider>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <NavBar />
                  <Home />
                  <Footer />
                </>
              }
            />

            <Route path="/signup" element={<Signup />} />

            <Route path="/verify" element={<Verify />} />

            <Route path="/signin" element={<Signin />} />

            <Route path="/forgot" element={<ForgotPassword />} />

            <Route path="/reset" element={<Reset />} />

            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/board" element={<Board />} />
            </Route>

            <Route
              path="*"
              element={
                <>
                  <NavBar />
                  <PageNotFound />
                  <Footer />
                </>
              }
            />
          </Routes>
        </DataProvider>
      </div>
    </div>
  );
}

export default App;
