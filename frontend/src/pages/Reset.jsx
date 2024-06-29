import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../components/Logo";
import { useState } from "react";
import InputField from "../components/InputField";
import CustomLink from "../components/CustomLink";
import CustomButton from "../components/CustomButton";

const Reset = () => {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("t");

  const [formData, setFormData] = useState({
    newpassword: "",
    confirmpassword: "",
  });

  const [errors, setErrors] = useState({
    newpassword: "",
    confirmpassword: "",
  });

  const [isDisabled, setIsDisabled] = useState(false);
  const [submit, setSubmit] = useState("Reset Password");

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmit("Please wait...");
    setIsDisabled(true);

    try {
      const resetReq = await axios.post("/resetpass", {
        password: formData.newpassword,
        token,
      });

      if (resetReq) {
        setSearchParams("");
        setFormData({
          newpassword: "",
          confirmpassword: "",
        });
        navigate("/signin");
        toast.success(resetReq.data.message);
      }
    } catch (err) {
      if (err.response.data.error === "Invalid Token") {
        navigate("/signin");
        toast.error("Password reset link expired.");
      } else {
        toast.error("Something went wrong");
      }
    }
    setSubmit("Reset Password");
    setIsDisabled(false);
  };

  const onValidate = (e) => {
    e.preventDefault();

    if (formData.newpassword.length === 0) {
      setErrors({
        newpassword: "Please enter a password.",
        confirmpassword: "",
      });
    } else if (formData.newpassword.length < 8) {
      setErrors({
        newpassword:
          "Password length is too short. (Password length should be of atleast 8 characters)",
        confirmpassword: "",
      });
    } else if (formData.confirmpassword.length === 0) {
      setErrors({
        newpassword: "",
        confirmpassword: "Please enter password again",
      });
    } else if (formData.newpassword !== formData.confirmpassword) {
      setErrors({
        newpassword: "",
        confirmpassword: "Passwords do not match!",
      });
    } else {
      setErrors({
        newpassword: "",
        confirmpassword: "",
      });
      onSubmit(e);
    }
  };

  return (
    <div className="flex min-h-[100vh] flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
      <div className="flex flex-col items-center justify-center sm:mx-auto sm:w-full sm:max-w-sm">
        <Logo />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-text-color-light dark:text-text-color-dark">
          Reset Your Password
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onValidate}>
          <InputField
            label="New Password"
            type="password"
            name="newpassword"
            placeholder="New Password"
            onchange={(e) => onChangeInput(e)}
            value={formData.newpassword}
            disable={isDisabled}
            error={errors.newpassword}
          />

          <InputField
            label="Confirm Password"
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password"
            onchange={(e) => onChangeInput(e)}
            value={formData.confirmpassword}
            disable={isDisabled}
            error={errors.confirmpassword}
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

export default Reset;
