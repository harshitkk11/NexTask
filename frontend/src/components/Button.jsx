const Button = ({ title = "", classname = "", onclick }) => {

  return (
    <button
      className={`bg-button-background-light dark:bg-button-background-dark hover:bg-button-hover-light dark:hover:bg-button-hover-dark font-medium text-[1.1rem] text-button-text-light dark:text-button-text-dark py-2 px-4 rounded-[5px] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-button-background-light dark:focus-visible:outline-button-background-dark ${classname}`}
      onClick={onclick}
    >
      {title}
    </button>
  );
};

export default Button;
