import { useState } from "react";
import axios from "axios";
import Logo from "../components/Logo";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import CustomLink from "../components/CustomLink";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";


const ForgotPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({
    email: "",
  });

  const [isDisabled, setIsDisabled] = useState(false);
  const [submit, setSubmit] = useState("Reset Password");

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmit(<Spinner aria-label="Please wait" />);
    setIsDisabled(true);

    try {
      await axios.post("/reset", formData).then((response) => {
        const res = response.data;
        if (res && res.message === "Reset email sent") {
          setFormData({
            email: "",
          });
          toast.success("Password reset link sent.");
        } else if (res.error) {
          toast.error(res.error);
        }
      });
    } catch (error) {
      toast.error("Something went wrong!!");
    }

    setSubmit("Reset Password");
    setIsDisabled(false);
  };

  const onValidate = (e) => {
    e.preventDefault();

    if (formData.email.length === 0) {
      setErrors({
        email: "Please enter your email.",
      });
    } else {
      setErrors({
        email: "",
      });

      onSubmit(e);
    }
  };

  return (
    <div className="flex min-h-[100vh] flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
      <div className="flex flex-col items-center justify-center sm:mx-auto sm:w-full sm:max-w-sm">
        <Logo />
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-text-color-light dark:text-text-color-dark">
          Forgot your password?
        </h2>
        <p className="mt-5 text-center text-text-color-light dark:text-text-color-dark ">
          Enter your email below to receive a password reset link.
        </p>
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

          <CustomButton title={submit} classname="w-[100%] !mt-6 rounded-lg" />
        </form>
        <p className="mt-10 flex items-center justify-center gap-2 text-lg text-text-color-light dark:text-text-color-dark">
          Back to <CustomLink path="/signin" title="Sign in" />
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
