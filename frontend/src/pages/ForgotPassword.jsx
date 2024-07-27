import { useState } from "react";
import Logo from "../components/Logo";
import InputField from "../components/InputField";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { sendPasswordResetEmail} from "firebase/auth";
import { auth} from "../firebase";

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
    setSubmit(
      <>
        <Spinner aria-label="Spinner" size="sm" />
        <span className="pl-3">Please Wait...</span>
      </>,
    );
    setIsDisabled(true);

    await sendPasswordResetEmail(auth, formData.email)
      .then(() => {
        setFormData({
          email: "",
        });
        toast.dismiss();
        toast.success("Password reset link sent.");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          toast.error("Please enter valid email address");
        } else {
          toast.error("Something went wrong!!");
          console.log(error);
        }
      });

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
    <div className="flex h-[100vh] w-full items-center justify-center overflow-auto bg-home-background-light dark:bg-home-background-dark md:py-10">
      <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl bg-Signup-background-light px-3 py-10 shadow-lg dark:bg-Signup-background-dark md:h-auto md:w-[50%]">
        <Logo />

        <h2 className="mt-5 text-center text-2xl font-bold text-home-text-light dark:text-home-text-dark">
          Forgot your password?
        </h2>

        <p className="mt-5 text-center text-base font-medium text-home-text-light dark:text-home-text-dark sm:text-lg ">
          Enter your email below to receive a password reset link.
        </p>

        <div className="mt-3 flex w-full flex-col items-center justify-center gap-5 px-3 sm:mx-auto sm:mt-5 sm:max-w-sm sm:px-0">
          <form className="w-full space-y-6" onSubmit={onValidate}>
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

            <button
              className="!mt-10 w-full rounded-xl bg-Signup-button-background p-3 text-lg font-semibold text-white hover:brightness-110"
              disabled={isDisabled}
            >
              {submit}
            </button>
          </form>

          <p className="flex items-center justify-center gap-2 text-lg text-home-text-light dark:text-home-text-dark">
            Back to{" "}
            <Link to="/signin" className="text-link hover:text-link-hover">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
