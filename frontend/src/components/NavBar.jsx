import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import Logo from "./Logo";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const navigator = useNavigate();


  function toggleTheme() {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  function handleClick() {
    navigator("/signin")
  }

  return (
    // <header
    //   className={`w-[100%] h-[4em] flex justify-center items-center ${
    //     isLoggedIn ? "bg-nav-background" : "bg-transparent"
    //   }`}
    // >
    //   <nav
    //     className={`flex items-center justify-between w-[100%] h-[100%] p-5 ${
    //       !isLoggedIn && "w-[97%] border-b border-border-color px-1"
    //     }`}
    //     aria-label="Global"
    //   >
    //     <div className="flex flex-row justify-center w-auto h-[50%]">
    //       {!isLoggedIn ? (
    //         <a
    //           href="/"
    //           className="flex flex-row justify-center items-center gap-0.5"
    //         >
    //           <span className="flex justify-center items-center font-semibold text-[1.5rem]">
    //             NexTask
    //           </span>
    //           <span className="flex justify-center items-center font-semibold text-[1.5rem]">
    //             |
    //           </span>
    //           <img className="h-6 w-auto" src={Logo1} alt="Website Logo" />
    //         </a>
    //       ) : (
    //         <a
    //           href="/"
    //           className="flex justify-center items-center bg-transparent"
    //         >
    //           <img className="h-5 w-auto" src={Logo2} alt="Website Logo" />
    //         </a>
    //       )}
    //     </div>
    //     {isLoggedIn ? <Button title="Log out" /> : <Button title="Log in" />}
    //   </nav>
    // </header>
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <Logo />
        <div className="flex justify-center items-center">
          <Button
            title="Log in"
            classname="!text-sm font-semibold leading-6"
            onclick={handleClick}
          />
          <Button
            title={theme === "dark" ? <MdDarkMode /> : <MdLightMode />}
            classname={`ml-1 md:ml-4 p-2 text-[1.4rem] md:text-[1.5rem] flex !bg-transparent !shadow-none transition ease-in-out delay-150 ${theme === "dark" ? "!text-text-color-dark" : "!text-text-color-light"}`}
            onclick={toggleTheme}
          />
          {/* <button
            className={`ml-4 p-2 text-xl flex ${theme === "dark" ? "text-text-color-dark" : "text-text-color-light"}`}
            onClick={toggleTheme}
          >
            {theme === "dark" ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
          </button> */}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
