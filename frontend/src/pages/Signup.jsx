import { useState } from "react";
import axios from "axios";
import Logo from "../components/Logo";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import { toast } from "react-toastify";
import { Spinner } from "flowbite-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [isDisabled, setIsDisabled] = useState(false);
  const [submit, setSubmit] = useState("Sign Up");
  const specialChars = /[ @!#$%^&*()+=_,.`~-]/;

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmit(<Spinner aria-label="Please wait" />);
    setIsDisabled(true);

    try {
      const response = await axios.post("/signup", formData);
      const res = response.data;

      if (res && !res.error) {
        if (res.message === "Signed up successfully") {
          toast.success(
            "Thank you for registering. Please check your inbox for a verification email to confirm your email address.",
          );
          setFormData({
            name: "",
            username: "",
            email: "",
            password: "",
          });
        } else if (res.message === "Username already exist") {
          setErrors({
            name: "",
            username: "Username already exist",
            email: "",
            password: "",
          });
        } else if (res.message === "Email already exist") {
          setErrors({
            name: "",
            username: "",
            email: "Email already exist",
            password: "",
          });
        } else {
          toast(res.message);
        }
      } else {
        throw new Error(res.error);
      }
    } catch (error) {
      toast.error("Something went wrong!!");
    }

    setSubmit("Sign Up");
    setIsDisabled(false);
  };

  const onValidate = (e) => {
    e.preventDefault();

    if (formData.name.length < 3) {
      setErrors({
        name: "Please enter your name.",
        username: "",
        email: "",
        password: "",
      });
    } else if (formData.username.length === 0) {
      setErrors({
        name: "",
        username: "Please enter a username.",
        email: "",
        password: "",
      });
    } else if (specialChars.test(formData.username)) {
      setErrors({
        name: "",
        username: "Please enter a valid username.",
        email: "",
        password: "",
      });
    } else if (formData.email.length === 0) {
      setErrors({
        name: "",
        username: "",
        email: "Please enter a valid email address.",
        password: "",
      });
    } else if (formData.password.length < 8) {
      setErrors({
        name: "",
        username: "",
        email: "",
        password:
          "Password length is too short. (Password length should be of atleast 8 characters)",
      });
    } else {
      setErrors({
        name: "",
        username: "",
        email: "",
        password: "",
      });

      onSubmit(e);
    }
  };

  return (
    <div className="flex min-h-[100vh] flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
      <div className="flex flex-col items-center justify-center sm:mx-auto sm:w-full sm:max-w-sm">
        <Logo />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-text-color-light dark:text-text-color-dark">
          Create your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <p className={`mt-1 text-base text-error-light dark:text-error-dark`}>
          {error}
        </p> */}
        <form className="space-y-6" onSubmit={onValidate}>
          <InputField
            label="Name"
            type="text"
            name="name"
            autocomplete="name"
            placeholder="Name"
            onchange={(e) => onChangeInput(e)}
            value={formData.name}
            disable={isDisabled}
            error={errors.name}
          />

          <InputField
            label="Username"
            type="text"
            name="username"
            autocomplete="username"
            placeholder="Username"
            onchange={(e) => onChangeInput(e)}
            value={formData.username}
            disable={isDisabled}
            error={errors.username}
          />

          <InputField
            label="Email"
            type="email"
            name="email"
            autocomplete="email"
            placeholder="Email"
            onchange={(e) => onChangeInput(e)}
            value={formData.email}
            disable={isDisabled}
            error={errors.email}
          />

          <InputField
            label="Password"
            type="password"
            name="password"
            placeholder="Password"
            onchange={(e) => onChangeInput(e)}
            value={formData.password}
            disable={isDisabled}
            error={errors.password}
          />

          <CustomButton title={submit} classname="w-[100%] !mt-16 rounded-lg" />
        </form>
        <p className="mt-10 flex items-center justify-center gap-2 text-lg text-text-color-light dark:text-text-color-dark">
          Already have an account?{" "}
          <a
            href="/signin"
            className="text-link-color-light hover:text-link-hover-light dark:text-link-color-dark hover:dark:text-link-hover-dark"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
