import React, { useState } from "react";
import Logo from "../components/Logo";
import { Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth, provider } from "../firebase";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isDisabled, setIsDisabled] = useState(false);
  const [submit, setSubmit] = useState("Sign Up");

  // handle input field
  const onChangeInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  // handle create account
  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmit(
      <>
        <Spinner aria-label="Spinner" size="sm" />
        <span className="pl-3">Please Wait...</span>
      </>
    );
    setIsDisabled(true);

    await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password,
    )
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: formData.name,
        }).then(async () => {
          await sendEmailVerification(userCredential.user).then(() => {
            signOut(auth).then(() => {
              setFormData({
                name: "",
                email: "",
                password: "",
              });
              toast.success(
                "Thank you for registering. Please check your inbox for a verification email to confirm your email address.",
              );
            });
          });
        });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setErrors({
            name: "",
            email: "Email already registered",
            password: "",
          });
        } else {
          toast.error("Something went wrong!!");
          console.log(error.code);
        }
      });

    setSubmit("Sign Up");
    setIsDisabled(false);
  };

  const onValidate = (e) => {
    e.preventDefault();

    if (formData.name.length < 3) {
      setErrors({
        name: "Please enter your name",
        email: "",
        password: "",
      });
    } else if (formData.email.length === 0) {
      setErrors({
        name: "",
        email: "Please enter a valid email address",
        password: "",
      });
    } else if (formData.password.length < 8) {
      setErrors({
        name: "",
        email: "",
        password:
          "Password length is too short. (Password length should be of atleast 8 characters)",
      });
    } else {
      setErrors({
        name: "",
        email: "",
        password: "",
      });

      onSubmit(e);
    }
  };

  // sign up with Google
  const signInWithGoogle = async (e) => {
    e.preventDefault();

    await signInWithPopup(auth, provider)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((error) => {
        toast.error(error.code);
        console.log(error.code);
      });
  };

  return (
    <div className="flex h-[100vh] w-full items-center justify-center overflow-auto bg-home-background-light dark:bg-home-background-dark md:py-10">
      <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl bg-Signup-background-light px-3 py-10 shadow-lg dark:bg-Signup-background-dark md:mt-36 md:h-auto md:w-[50%]">
        <Logo />

        <h2 className="mt-5 text-center text-2xl font-bold text-home-text-light dark:text-home-text-dark">
          Create your account
        </h2>
        <div className="mt-3 flex w-full flex-col items-center justify-center gap-5 px-3 sm:mx-auto sm:mt-5 sm:max-w-sm sm:px-0">
          <form className="w-full space-y-6" onSubmit={onValidate}>
            <InputField
              label="Name"
              type="text"
              name="name"
              autocomplete="name"
              placeholder=" Enter Your Name"
              onchange={(e) => onChangeInput(e)}
              value={formData.name}
              disable={isDisabled}
              error={errors.name}
            />

            <InputField
              label="Email"
              type="email"
              name="email"
              autocomplete="email"
              placeholder="Enter your Email"
              onchange={(e) => onChangeInput(e)}
              value={formData.email}
              disable={isDisabled}
              error={errors.email}
            />

            <InputField
              label="Password"
              type="password"
              name="password"
              autocomplete="new-password"
              placeholder="Password"
              onchange={(e) => onChangeInput(e)}
              value={formData.password}
              disable={isDisabled}
              error={errors.password}
            />

            <button
              className="bg-Signup-button-background !mt-14 w-full rounded-xl p-3 text-lg font-semibold text-white hover:brightness-110"
              disabled={isDisabled}
            >
              {submit}
            </button>
          </form>

          <div className="flex w-full flex-col items-center justify-center gap-5">
            <div className="flex w-full items-center justify-between text-home-text-light dark:text-home-text-dark">
              <div className="flex-grow border-t border-border-light dark:border-border-dark"></div>
              <p className="p-4 text-base">Or</p>
              <div className="flex-grow border-t border-border-light dark:border-border-dark"></div>
            </div>

            {/* Sign up with Google */}
            <div className="flex w-full items-center justify-center">
              <button
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-border-light p-3 text-lg font-semibold text-home-text-light hover:shadow-md hover:brightness-110 dark:border-border-dark dark:text-home-text-dark"
                onClick={signInWithGoogle}
              >
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.3055 10.0415H21.5V10H12.5V14H18.1515C17.327 16.3285 15.1115 18 12.5 18C9.1865 18 6.5 15.3135 6.5 12C6.5 8.6865 9.1865 6 12.5 6C14.0295 6 15.421 6.577 16.4805 7.5195L19.309 4.691C17.523 3.0265 15.134 2 12.5 2C6.9775 2 2.5 6.4775 2.5 12C2.5 17.5225 6.9775 22 12.5 22C18.0225 22 22.5 17.5225 22.5 12C22.5 11.3295 22.431 10.675 22.3055 10.0415Z"
                    fill="#FFC107"
                  />
                  <path
                    d="M3.65295 7.3455L6.93845 9.755C7.82745 7.554 9.98045 6 12.5 6C14.0295 6 15.421 6.577 16.4805 7.5195L19.309 4.691C17.523 3.0265 15.134 2 12.5 2C8.65895 2 5.32795 4.1685 3.65295 7.3455Z"
                    fill="#FF3D00"
                  />
                  <path
                    d="M12.5 22C15.083 22 17.43 21.0115 19.2045 19.404L16.1095 16.785C15.0718 17.5742 13.8038 18.001 12.5 18C9.89903 18 7.69053 16.3415 6.85853 14.027L3.59753 16.5395C5.25253 19.778 8.61353 22 12.5 22Z"
                    fill="#4CAF50"
                  />
                  <path
                    d="M22.3055 10.0415H21.5V10H12.5V14H18.1515C17.7571 15.1082 17.0467 16.0766 16.108 16.7855L16.1095 16.7845L19.2045 19.4035C18.9855 19.6025 22.5 17 22.5 12C22.5 11.3295 22.431 10.675 22.3055 10.0415Z"
                    fill="#1976D2"
                  />
                </svg>
                <span>Sign up with Google</span>
              </button>
            </div>
          </div>
          <p className="flex items-center justify-center gap-2 text-lg text-home-text-light dark:text-home-text-dark">
            Already have an account?{" "}
            <Link to="/signin" className="text-link hover:text-link-hover">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
