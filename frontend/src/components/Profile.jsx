import { useNavigate } from "react-router-dom";
import { useData } from "../hooks/DataProvider";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Dropdown } from "flowbite-react";
import { toast } from "react-toastify";
import { RxAvatar } from "react-icons/rx";
import { GoSignOut } from "react-icons/go";
import { MdOutlineSettings } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";

const Profile = () => {
  const navigate = useNavigate();
  const { userData } = useData();

  const handleLogout = async () => {
    signOut(auth)
      .then(() => {
        navigate("/signin");
      })
      .catch((error) => {
        toast.error("Something went wrong!!");
        console.log(error);
      });
  };

  return (
    <Dropdown
      label=""
      dismissOnClick={true}
      renderTrigger={() => (
        <span className="cursor-pointer text-3xl hover:text-home-button-hover-light hover:dark:text-home-button-hover-dark">
          <RxAvatar />
        </span>
      )}
      className="mt-4 rounded-md border-0 bg-navbar-background-light p-4 text-home-text-light shadow-md outline-none transition-none dark:border-0 dark:bg-navbar-background-dark dark:text-home-text-dark dark:shadow-md"
    >
      <Dropdown.Header className="mb-1 border-border-light pb-4 dark:border-border-dark">
        <span className="block text-sm">{userData.name}</span>
        <span className="block truncate text-sm font-medium">
          {userData.email}
        </span>
      </Dropdown.Header>
      <Dropdown.Item
        className="flex items-center justify-start gap-2 rounded-md border-0 text-sm text-home-text-light outline-none hover:text-home-button-hover-light dark:text-home-text-dark hover:dark:text-home-button-hover-dark"
        onClick={() => navigate("/dashboard")}
      >
        <RxDashboard /> Dashboard
      </Dropdown.Item>
      <Dropdown.Item
        className="flex items-center justify-start gap-2 rounded-md border-0 text-sm text-home-text-light outline-none hover:text-home-button-hover-light dark:text-home-text-dark hover:dark:text-home-button-hover-dark"
        onClick={() => navigate("/settings")}
      >
        <MdOutlineSettings /> Settings
      </Dropdown.Item>
      <Dropdown.Divider className="my-3 border-b border-border-light dark:border-border-dark" />
      <Dropdown.Item
        className="flex items-center justify-start gap-2 rounded-md border-0 text-sm text-home-text-light outline-none hover:text-home-button-hover-light dark:text-home-text-dark hover:dark:text-home-button-hover-dark"
        onClick={handleLogout}
      >
        <GoSignOut /> Sign out
      </Dropdown.Item>
    </Dropdown>
  );
};

export default Profile;
