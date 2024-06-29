import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useData } from "../hooks/DataProvider";
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";

const Board = () => {
  const { userData } = useData();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("b");

  const [boardTitle, setBoardTitile] = useState("");

  useEffect(() => {
    const fetch = async () => {
      if (!query) {
        navigate("/404");
      } else {
        const boardtitle = decodeURIComponent(query);
        if (userData.username) {
          try {
            const response = await axios.post("/getboarddata", {
              username: userData.username,
              boardtitle,
            });

            if (response.data) {
              setBoardTitile(response.data.boardtitle);
            }
          } catch (err) {
            toast.error("Something went wrong!!")
          }
        }
        // setSearchParams({'b': "test"})
      }
    };
    fetch();
  }, [userData, query]);

  return (
    <div className="h-[100vh] w-full bg-dashboard-bg-light text-text-color-light dark:bg-dashboard-bg-dark dark:text-text-color-dark">
      <nav className="flex h-[7vh] w-full flex-row bg-border-color-light text-navbar-text-light dark:bg-border-color-dark dark:text-navbar-text-dark">
        <div className="flex w-1/2 items-center justify-start pl-10">
          <h4 className="text-xl font-semibold">{boardTitle}</h4>
        </div>
        <div className="flex w-1/2 items-center justify-end gap-5 pr-8">
          <button className="text-2xl text-navbar-text-light dark:text-navbar-text-dark">
            <MdOutlineEdit />
          </button>
          <button className="text-2xl text-error-light dark:text-error-dark">
            <MdDeleteOutline />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Board;
