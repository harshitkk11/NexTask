import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const Logo = () => {
  const { theme } = useContext(ThemeContext);
  const [color, setColor] = useState("#333333");

  useEffect(() => {
    if (theme === "dark") {
      setColor("#f5f5f5");
    } else {
      setColor("#333333");
    }
  }, [theme]);

  return (
    <a href="/" className="w-auto flex justify-center items-center gap-0.5">
      <span className="flex justify-center items-center text-[1.5rem] font-semibold text-text-color-light dark:text-text-color-dark tracking-wide">
        NexTask
      </span>
      <span className="flex justify-center items-center text-[1.5rem] font-semibold text-text-color-light dark:text-text-color-dark">
        |
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 88.92041352883678 95.481"
        height="30"
        width="25"
        data-background-color="#ffffff"
        preserveAspectRatio="xMidYMid meet"
        id="tight-bounds"
      >
        <g>
          <svg
            viewBox="0 0 88.92041352883678 95.481"
            height="95.481"
            width="88.92041352883678"
          >
            <g>
              <svg
                viewBox="0 0 88.92041352883678 95.481"
                height="95.481"
                width="88.92041352883678"
              >
                <g id="textblocktransform">
                  <svg
                    viewBox="0 0 88.92041352883678 95.481"
                    height="95.481"
                    width="88.92041352883678"
                    id="textblock"
                  >
                    <g>
                      <svg
                        viewBox="0 0 88.92041352883678 95.481"
                        height="95.481"
                        width="88.92041352883678"
                      >
                        <g>
                          <svg
                            viewBox="0 0 88.92041352883678 95.481"
                            height="95.481"
                            width="88.92041352883678"
                          >
                            <g>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                version="1.1"
                                x="0"
                                y="0"
                                viewBox="8.571000099182129 3.3509979248046875 86.28300476074219 92.64900207519531"
                                enable-background="new 0 0 100 100"
                                xml:space="preserve"
                                height="95.481"
                                width="88.92041352883678"
                                class="icon-icon-0"
                                data-fill-palette-color="accent"
                                id="icon-0"
                                fill="#000000"
                              >
                                <g
                                  fill="#000000"
                                  data-fill-palette-color="accent"
                                >
                                  <g
                                    fill="#000000"
                                    data-fill-palette-color="accent"
                                  >
                                    <g
                                      fill="#000000"
                                      data-fill-palette-color="accent"
                                    >
                                      <path
                                        fill={color}
                                        d="M82.22 36.832H21.205c-6.968 0-12.634 5.761-12.634 12.831 0 7.073 5.666 12.824 12.634 12.824H82.22c6.968 0 12.634-5.751 12.634-12.824C94.854 42.593 89.188 36.832 82.22 36.832z"
                                        data-fill-palette-color="accent"
                                      />
                                    </g>
                                    <g
                                      fill="#000000"
                                      data-fill-palette-color="accent"
                                    >
                                      <path
                                        fill={color}
                                        d="M53.682 70.511c0-0.055-0.003-0.11-0.003-0.162h-1.901H23.236h-2.031c-6.968 0-12.634 5.754-12.634 12.823C8.571 90.246 14.237 96 21.205 96h2.303 28.27 2.176c0-0.069 0-0.137 0-0.203 5.931-1.049 10.458-6.307 10.458-12.625C64.411 76.76 59.746 71.448 53.682 70.511z"
                                        data-fill-palette-color="accent"
                                      />
                                    </g>
                                    <g
                                      fill="#000000"
                                      data-fill-palette-color="accent"
                                    >
                                      <path
                                        fill={color}
                                        d="M21.205 29.001h16.003 16.745 11.526c6.966 0 12.629-5.754 12.629-12.824 0-7.072-5.663-12.826-12.629-12.826H53.679 36.936h-15.73c-6.968 0-12.634 5.754-12.634 12.826C8.571 23.247 14.237 29.001 21.205 29.001z"
                                        data-fill-palette-color="accent"
                                      />
                                    </g>
                                  </g>
                                </g>
                              </svg>
                            </g>
                          </svg>
                        </g>
                      </svg>
                    </g>
                  </svg>
                </g>
              </svg>
            </g>
          </svg>
        </g>
        <defs />
      </svg>
      {/* <a
        href="/"
        className="-m-1.5 p-1.5 flex flex-row justify-center items-center gap-x-0.5"
      >
        <span className="flex justify-center items-center font-semibold text-[1.5rem]">
          NexTask
        </span>
        <span className="flex justify-center items-center font-semibold text-[1.5rem]">
          |
        </span>
        <img className="h-6 w-auto" src={LogoImg} alt="Website Logo" />
      </a> */}
    </a>
  );
};

export default Logo;
