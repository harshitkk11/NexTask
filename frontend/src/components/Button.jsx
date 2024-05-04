import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const Button = ({ title }) => {
  const {theme} = useContext(ThemeContext);
  
  return (
    <button className="bg-button-bg hover:bg-button-hover font-medium text-[1.1rem] text-button-color hover:text-black py-2 px-4 rounded-[5px]">
      {title}
    </button>
  );
};

export default Button;
