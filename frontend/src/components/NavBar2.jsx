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
    <header className="bg-navbar-background-light dark:bg-navbar-background-dark text-home-text-light dark:text-home-text-dark border-b border-border-light dark:border-border-dark">
      <nav
        className="flex items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <Logo />
        <div className="flex items-center justify-center gap-7">
          <button
            onClick={toggleTheme}
            className="text-3xl text-home-text-light dark:text-home-text-dark"
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
