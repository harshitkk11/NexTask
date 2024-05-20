import { useState } from "react";
import axios from "axios";
import Logo from "../components/Logo";
import InputField from "../components/InputField";
import Button from "../components/Button";
import CustomLink from "../components/CustomLink";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_SERVER_URL;

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [isDisabled, setIsDisabled] = useState(false);
  const [submit, setSubmit] = useState("Sign In");

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmit("Please wait...");
    setIsDisabled(true);

    try {
      await axios.post("/signin", formData).then((response) => {
        const res = response.data;
        if (res && res.message === "Logged in successfully") {
          setFormData({
            email: "",
            password: "",
          });
          localStorage.setItem("islogin", true);
          navigate("/boards");
          window.location.reload();
        } else if (res.error) {
          toast.error(res.error);
        }
      });
    } catch (error) {
      toast.error("Something went wrong!!");
    }

    setSubmit("Sign In");
    setIsDisabled(false);
  };

  const onValidate = (e) => {
    e.preventDefault();

    if (formData.email.length === 0) {
      setErrors({
        email: "Please enter a username.",
        password: "",
      });
    } else if (formData.password.length === 0) {
      setErrors({
        email: "",
        password: "Please enter your password",
      });
    } else {
      setErrors({
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
          Sign in to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onValidate}>
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

          <p className="flex justify-end">
            <CustomLink path="#" title="Forgot Password?" />
          </p>

          <Button title={submit} classname="w-[100%] !mt-6 rounded-lg" />
        </form>
        <p className="mt-10 flex items-center justify-center gap-2 text-lg text-text-color-light dark:text-text-color-dark">
          Don't have an account? <CustomLink path="/signup" title="Sign up" />
        </p>
      </div>
    </div>
  );
};

export default Signin;
