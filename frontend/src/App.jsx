import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import PageNotFound from "./pages/PageNotFound";
import ForgotPassword from "./pages/ForgotPassword";
import DataProvider from "./hooks/DataProvider";
import Board from "./pages/Board";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <DataProvider>
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

          <Route path="/forgot" element={<ForgotPassword />} />

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
    </>
  );
}

export default App;
