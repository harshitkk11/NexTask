import axios from "axios";
// import { useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { useData } from "../hooks/DataProvider";
// import {
//   Popover,
//   PopoverButton,
//   PopoverPanel,
//   Transition,
// } from "@headlessui/react";
import { Dropdown } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  // const [active, setActive] = useState(false);
  const { userData } = useData();

  // const clickHandle = () => {
  //   setActive(!active);
  // };

  const handleLogout = async () => {
    const response = await axios.get("/logout");

    if (response.data.message === "Logged out successfully") {
      localStorage.removeItem("islogin");
      window.location.reload();
    }
  };

  return (
    // <Popover className="relative">
    //   <PopoverButton className="text-3xl outline-none hover:text-button-hover-light hover:dark:text-button-hover-dark">
    //     <RxAvatar />
    //   </PopoverButton>

    //   <Transition
    //     enter="transition ease duration-100"
    //     enterFrom="opacity-0 translate-y-1"
    //     enterTo="opacity-100 translate-y-0"
    //     leave="transition ease duration-100"
    //     leaveFrom="opacity-100 translate-y-0"
    //     leaveTo="opacity-0 translate-y-1"
    //   >
    //     <PopoverPanel className="absolute top-[3.7em] -left-24 md:-left-16 z-10 flex max-w-max -translate-x-1/2">
    //       <div className="bg-dashboard-navbar-bg-light dark:bg-dashboard-navbar-bg-dark shadow-dashboard-navbar-bg-dark max-w-md flex-auto overflow-hidden rounded-b-lg rounded-l-lg rounded-t-lg p-4 text-sm leading-6 drop-shadow-lg dark:shadow-navbar-background-light">
    //         {/* <div className="p-4"> */}
    //         <div className=" flex w-[100%] flex-col items-start justify-center border-b-2 border-border-color-light p-3 text-navbar-text-light dark:border-border-color-dark dark:text-navbar-text-dark">
    //           <p className="mb-3 text-lg font-medium">Account</p>
    //           <p className="text-sm">{userData.name}</p>
    //           <p className="text-sm">{userData.email}</p>
    //         </div>
    //         <button
    //           onClick={handleLogout}
    //           className="p-3 hover:text-button-hover-light dark:hover:text-button-hover-dark"
    //         >
    //           Log Out
    //         </button>
    //         {/* </div> */}
    //       </div>
    //     </PopoverPanel>
    //   </Transition>
    // </Popover>
    <Dropdown
      label=""
      dismissOnClick={false}
      renderTrigger={() => (
        <span className="cursor-pointer text-3xl hover:text-button-hover-light hover:dark:text-button-hover-dark">
          <RxAvatar />
        </span>
      )}
      className="mt-4 rounded-md border-0 bg-dashboard-navbar-bg-light p-4 text-navbar-text-light shadow-md outline-none transition-none dark:border-0 dark:bg-dashboard-navbar-bg-dark dark:text-navbar-text-dark dark:shadow-md"
    >
      <Dropdown.Header className="mb-4 border-b border-border-color-light pb-4 dark:border-border-color-dark">
        <span className="block text-sm">{userData.name}</span>
        <span className="block truncate text-sm font-medium">
          {userData.email}
        </span>
      </Dropdown.Header>
      <Dropdown.Item className="border-0 text-sm text-text-color-light outline-none hover:text-button-hover-dark dark:text-text-color-dark dark:hover:text-button-hover-light" onClick={() => navigate("/dashboard")}>
        Dashboard
      </Dropdown.Item>
      <Dropdown.Item className="border-0 text-sm text-text-color-light outline-none hover:text-button-hover-dark dark:text-text-color-dark dark:hover:text-button-hover-light">
        Settings
      </Dropdown.Item>
      <Dropdown.Divider className="my-3 border-b border-border-color-light dark:border-border-color-dark" />
      <Dropdown.Item
        className="border-0 text-sm text-text-color-light outline-none hover:text-button-hover-dark dark:text-text-color-dark dark:hover:text-button-hover-light"
        onClick={handleLogout}
      >
        Sign out
      </Dropdown.Item>
    </Dropdown>
  );
};

export default Profile;
