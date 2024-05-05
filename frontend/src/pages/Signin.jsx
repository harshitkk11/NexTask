import { useState } from "react";
import Logo from "../components/Logo";
import InputField from "../components/InputField";
import Button from "../components/Button";

const Signin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [isDisabled, setIsDisabled] = useState(false);
  const [submit, setSubmit] = useState("Sign In");

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmit("Please wait...");
    setIsDisabled(true);
    console.log(formData);
    setFormData({
      username: "",
      password: "",
    });
    setSubmit("Sign In");
    setIsDisabled(false);
  };

  const onValidate = (e) => {
    e.preventDefault();

    if (formData.username.length === 0) {
      setErrors({
        username: "Please enter a username.",
        password: "",
      });
    }  else if (formData.password.length === 0) {
      setErrors({
        username: "",
        password:
          "Please enter your password",
      });
    } else {
      setErrors({
        username: "",
        password: "",
      });

      onSubmit(e);
    }
  };

  return (
    <div className="flex min-h-[100vh] flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Logo />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-text-color-light dark:text-text-color-dark">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onValidate}>
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
            label="Password"
            type="password"
            name="password"
            placeholder="Password"
            onchange={(e) => onChangeInput(e)}
            value={formData.password}
            disable={isDisabled}
            error={errors.password}
          />

          <Button title={submit} classname="w-[100%] !mt-16 rounded-lg" />
        </form>
        <p className="mt-10 flex items-center justify-center gap-2 text-lg text-text-color-light dark:text-text-color-dark">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-link-color-light hover:text-link-hover-light dark:text-link-color-dark hover:dark:text-link-hover-dark"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
