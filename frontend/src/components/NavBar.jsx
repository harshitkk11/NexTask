import Logo1 from "../assets/image/logo4.svg";

const NavBar = ({ isLoggedIn }) => {

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
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5 flex flex-row justify-center items-center gap-x-0.5">
            <span className="flex justify-center items-center font-semibold text-[1.5rem]">
              NexTask
            </span>
            <span className="flex justify-center items-center font-semibold text-[1.5rem]">
              |
            </span>
            <img className="h-6 w-auto" src={Logo1} alt="Website Logo" />
          </a>
        </div>
        <div className="lg:flex lg:flex-1 lg:justify-end">
          <a href="/signin" className="text-sm font-semibold leading-6 text-text-color border py-2 px-4 rounded-md hover:text-button-hover">
            Log in
          </a>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
