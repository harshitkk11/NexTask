import React from "react";
import Button1 from "../components/Button1";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="w-full h-[90vh] bg-home-background-light dark:bg-home-background-dark flex justify-center items-center">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="flex flex-col justify-center items-center text-center">
            <p className="text-xl font-semibold trackinig-wider text-link">
              404
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-home-text-light dark:text-home-text-dark sm:text-5xl">
              Page not found
            </h1>
            <p className="mt-6 text-lg leading-7 tracking-wide text-home-text-light dark:text-home-text-dark">
              Sorry, we couldn't find the page you're looking for.
            </p>
            <Button1
              title="Go back home"
              classname="mt-10"
              onclick={handleClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
