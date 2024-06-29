import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const Verify = () => {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("t");

  useEffect(() => {
    const handleClick = async () => {
      try {
        const verifyReq = await axios.post("/verify", { token });

        if (verifyReq) {
            setSearchParams("");
            navigate("/signin");
            toast.success(verifyReq.data.message);
        }
      } catch (err) {
        if (err.response.data.error === "Invalid Token") {
            navigate("/signin")
            toast.error("Email verification link expired.")
        }
        else {
            toast.error("Something went wrong");
        }
      }
    };
    handleClick();
  }, []);

  //   return <button onClick={(e) => handleClick(e)}>Verify</button>;
};

export default Verify;
