import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import Logo from "./Logo";
import Profile from "./Profile";

const NavBar = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  function toggleTheme() {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  return (
    <header className="bg-dashboard-navbar-bg-light dark:bg-dashboard-navbar-bg-dark text-navbar-text-light dark:text-navbar-text-dark">
      <nav
        className="flex items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <Logo />
        <div className="flex items-center justify-center gap-7">
          <button
            onClick={toggleTheme}
            className="text-3xl text-text-color-light dark:text-text-color-dark"
          >
            {theme === "dark" ? <MdDarkMode /> : <MdLightMode />}
          </button>
          <Profile />
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
