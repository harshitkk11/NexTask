import React from "react";

const Button1 = ({ title, onclick, classname }) => {
  return (
    <button
      className={`bg-home-button-background-light dark:bg-home-button-background-dark text-home-button-text-light dark:text-home-button-text-dark hover:bg-home-button-hover-light dark:hover:bg-home-button-hover-dark rounded-lg px-5 py-2 text-[1.1rem] font-medium ${classname}`}
      onClick={onclick}
    >
      {title}
    </button>
  );
};

export default Button1;
