import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

function App() {
  const currentPath = window.location.pathname; // change this with user login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (currentPath !== "/") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [currentPath]);

  return (
    <div className="min-h-[100vh] w-[100%]">
      <div className="pages">
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
        </Routes>
      </div>
    </div>
  );
}

export default App;
