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

            <Route path="/signin" element={<Signin />} />

            <Route element={<PrivateRoute />}>
              <Route path="/boards" element={<Dashboard />} />
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
