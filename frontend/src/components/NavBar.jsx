import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import Button1 from "./Button1";

const NavBar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  function toggleTheme() {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  function handleClick() {
    navigate("/signin");
  }

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <Logo />
        <div className="flex items-center justify-center gap-7">
          <Button1 title="Log In" onclick={handleClick} />
          <button onClick={toggleTheme} className="text-home-text-light dark:text-home-text-dark text-3xl">
            {theme === "dark" ? <MdDarkMode /> : <MdLightMode />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
