import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useData } from "../hooks/DataProvider";
import Button1 from "../components/Button1";
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { Modal, Spinner } from "flowbite-react";

const Settings = () => {
  const { userData } = useData();
  const navigate = useNavigate();

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    deletePassword: "",
  });

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    deletePassword: "",
  });

  const [isDisabled, setIsDisabled] = useState(false);
  const [submit, setSubmit] = useState("Save");
  const [deleteButton, setDeleteButton] = useState("Delete");

  const [openModal, setOpenModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPassword({ ...password, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmit(<Spinner aria-label="Spinner" size="sm" />);
    setIsDisabled(true);

    const credential = EmailAuthProvider.credential(
      userData.email,
      password.currentPassword,
    );

    await reauthenticateWithCredential(auth.currentUser, credential)
      .then(async () => {
        await updatePassword(auth.currentUser, password.newPassword).then(
          () => {
            setPassword({
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
              deletePassword: "",
            });
            toast.success("Password changed successfully");
          },
        );
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          setErrors({
            currentPassword: "Password entered is incorrect.",
            newPassword: "",
            confirmPassword: "",
            deletePassword: "",
          });
        } else if (error.code === "auth/too-many-requests") {
          setErrors({
            currentPassword: "Too many attemp",
            newPassword: "",
            confirmPassword: "",
            deletePassword: "",
          });
        } else {
          toast.error("Something went wrong!!");
          console.log(error);
        }
      });

    setSubmit("Save");
    setIsDisabled(false);
  };

  const onValidate = (e) => {
    e.preventDefault();

    if (!password.currentPassword) {
      setErrors({
        currentPassword: "Please enter your current password",
        newPassword: "",
        confirmPassword: "",
        deletePassword: "",
      });
    } else if (password.newPassword.length < 8) {
      setErrors({
        currentPassword: "",
        newPassword:
          "Password length is too short. (Password length should be of atleast 8 characters)",
        confirmPassword: "",
        deletePassword: "",
      });
    } else if (!password.confirmPassword) {
      setErrors({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "Please enter password again",
        deletePassword: "",
      });
    } else if (password.newPassword !== password.confirmPassword) {
      setErrors({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "Passwords do not match",
        deletePassword: "",
      });
    } else {
      setErrors({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        deletePassword: "",
      });

      handleUpdate(e);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    setDeleteButton(<Spinner aria-label="Spinner" size="sm" />);
    setIsDisabled(true);

    if (!password.deletePassword) {
      setErrors({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        deletePassword: "Please enter your current password",
      });
      return;
    }

    const credential = EmailAuthProvider.credential(
      userData.email,
      password.deletePassword,
    );

    await reauthenticateWithCredential(auth.currentUser, credential)
      .then(async () => {
        const response = await axios.post("/deleteuserdata", {
          userId: userData.id,
        });

        if (response.data) {
          deleteUser(auth.currentUser).then(() => {
            navigate("/signup");
          });
        }
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          setErrors({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
            deletePassword: "Password entered is incorrect.",
          });
        } else if (error.code === "auth/too-many-requests") {
          setErrors({
            currentPassword: "Too many attemp",
            newPassword: "",
            confirmPassword: "",
            deletePassword: "Too many attemp",
          });
        } else {
          toast.error("Something went wrong!!");
          console.log(error);
        }
      });

    setDeleteButton("Delete");
    setIsDisabled(false);
  };

  return (
    <div className="flex h-[100vh] w-full flex-col justify-center px-8 py-10 text-home-text-light dark:text-home-text-dark sm:px-10">
      <h3 className="border-b border-border-light px-2 py-8 text-2xl font-bold text-gray-700 dark:border-border-dark dark:text-gray-300 sm:px-6">
        Account Settings
      </h3>
      <div className="flex h-full w-full flex-col gap-3 sm:h-full sm:px-5">
        <div className="flex w-full flex-col gap-5 border-b border-border-light px-2 py-8 dark:border-border-dark">
          <h4 className="text-lg font-medium">Personal Information</h4>

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              disabled
              className="w-full rounded-lg border-0 bg-gray-400 bg-opacity-30 px-4 py-3 text-sm font-medium text-home-text-light outline-none dark:bg-black dark:bg-opacity-70 dark:text-home-text-dark sm:w-1/2"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              disabled
              className="w-full rounded-lg border-0 bg-gray-400 bg-opacity-30 px-4 py-3 text-sm font-medium text-home-text-light outline-none enabled:border enabled:border-home-button-background-light focus:enabled:border-0 dark:bg-black dark:bg-opacity-70 dark:text-home-text-dark dark:enabled:border-home-button-background-dark sm:w-1/2"
            />
          </div>
        </div>

        <form
          onSubmit={onValidate}
          className="flex w-full flex-col gap-5 border-b border-border-light px-2 py-8 dark:border-border-dark"
        >
          <h4 className="text-lg font-medium">Change Password</h4>

          <div className="flex flex-col gap-2">
            <label htmlFor="currentPassword" className="text-sm font-medium">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={password.currentPassword}
              onChange={handleChange}
              disabled={isDisabled}
              autoComplete="current-password"
              className={`w-full rounded-lg bg-gray-400 bg-opacity-30 px-4 py-3 text-sm font-medium text-home-text-light outline-none dark:bg-black dark:bg-opacity-70 dark:text-home-text-dark sm:w-1/2 ${
                errors.currentPassword ? "border-2 border-error" : "border-0"
              }`}
            />
            {errors.currentPassword && (
              <p className="mt-1 text-sm text-error">
                {errors.currentPassword}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="newPassword" className="text-sm font-medium">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={password.newPassword}
              onChange={handleChange}
              disabled={isDisabled}
              autoComplete="new-password"
              className={`w-full rounded-lg bg-gray-400 bg-opacity-30 px-4 py-3 text-sm font-medium text-home-text-light outline-none dark:bg-black dark:bg-opacity-70 dark:text-home-text-dark sm:w-1/2 ${
                errors.newPassword ? "border-2 border-error" : "border-0"
              }`}
            />
            {errors.newPassword && (
              <p className="mt-1 text-sm text-error">{errors.newPassword}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={password.confirmPassword}
              onChange={handleChange}
              disabled={isDisabled}
              autoComplete="new-password"
              className={`w-full rounded-lg bg-gray-400 bg-opacity-30 px-4 py-3 text-sm font-medium text-home-text-light outline-none dark:bg-black dark:bg-opacity-70 dark:text-home-text-dark sm:w-1/2 ${
                errors.confirmPassword ? "border-2 border-error" : "border-0"
              }`}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-error">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <Button1
            title={submit}
            disabled={isDisabled}
            classname="w-20 text-sm"
          />
        </form>

        <div className="flex w-full flex-col gap-5 border-b border-border-light px-2 py-8 dark:border-border-dark">
          <h4 className="text-lg font-medium">Delete Account</h4>

          <div className="flex flex-col items-start justify-center gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium">
              This will deleting your account permanently and cannot be undone.
            </p>
            <button
              onClick={() => setOpenModal(true)}
              className="text-nowrap rounded-lg bg-error px-4 py-2 text-sm text-home-button-text-light dark:text-home-button-text-dark"
            >
              Delete Account
            </button>
            <Modal
              show={openModal}
              size="sm"
              onClose={() => setOpenModal(false)}
              popup
              className="bg-black"
            >
              <Modal.Header className="rounded-t-lg bg-navbar-background-light text-home-text-light dark:bg-navbar-background-dark dark:text-home-text-dark" />
              <Modal.Body className="rounded-b-lg bg-navbar-background-light text-home-text-light dark:bg-navbar-background-dark dark:text-home-text-dark">
                <div className="flex flex-col gap-3">
                  <h4 className="text-lg font-bold">Delete Account</h4>

                  <p className="text-sm font-medium">
                    Please enter your current password.
                  </p>

                  <input
                    type="password"
                    id="deletePassword"
                    name="deletePassword"
                    value={password.deletePassword}
                    onChange={handleChange}
                    disabled={isDisabled}
                    autoComplete="current-password"
                    autoFocus
                    className={`w-full rounded-lg bg-gray-400 bg-opacity-30 px-4 py-3 text-sm font-medium text-home-text-light outline-none dark:bg-black dark:bg-opacity-70 dark:text-home-text-dark sm:w-1/2 ${
                      errors.deletePassword
                        ? "border-2 border-error"
                        : "border-0"
                    }`}
                  />
                  {errors.deletePassword && (
                    <p className="mt-1 text-sm text-error">
                      {errors.deletePassword}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setOpenModal(false)}
                      className="text-nowrap rounded-lg border border-border-light bg-transparent px-4 py-2 text-sm text-home-text-light hover:bg-gray-400 hover:bg-opacity-20 dark:border-border-dark dark:text-home-text-dark"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={handleDelete}
                      className="text-nowrap rounded-lg bg-error px-4 py-2 text-sm text-home-button-text-light dark:text-home-button-text-dark"
                    >
                      {deleteButton}
                    </button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
