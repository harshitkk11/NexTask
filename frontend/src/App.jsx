import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer"
import { useEffect, useState } from "react";

function App() {
  const currentPath = window.location.pathname; // change this with user login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (currentPath !== "/") {
      setIsLoggedIn(true);
    }
  }, [currentPath]);

  return (
    <div className="w-[100%] h-[100vh]">
      <NavBar isLoggedIn={isLoggedIn} />
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
