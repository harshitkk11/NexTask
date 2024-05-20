const CustomLink = ({ path = "", title = "", classname = "" }) => {
  return (
    <a
      href={path}
      className={`text-link-color-light hover:text-link-hover-light dark:text-link-color-dark hover:dark:text-link-hover-dark ${classname}`}
    >
      {title}
    </a>
  );
};

export default CustomLink;
