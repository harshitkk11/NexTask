import { useLocation, useNavigate } from "react-router-dom";
import { useData } from "../hooks/DataProvider";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { LuSettings2 } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegCircle } from "react-icons/fa6";
import { Dropdown } from "flowbite-react";

const Board = () => {
  const initialized = useRef(false);

  const { userData } = useData(); // Data Provider hook (provides user data - name, id and email)

  const navigate = useNavigate();
  const location = useLocation();

  const [boardTitle, setBoardTitle] = useState(location.state.title);
  const [background, setBackground] = useState(location.state.bg);

  const [boardData, setBoardData] = useState({});

  useEffect(() => {
    const fetchBoardData = async () => {
      if (!location.state) {
        navigate("/404");
        return;
      }

      if (userData.id) {
        try {
          if (!initialized.current) {
            initialized.current = true;
            const response = await axios.post("/getlists", {
              userId: userData.id,
              boardId: location.state.id,
            });

            if (response.data) {
              setBoardData(response.data);
            }
          }
        } catch (err) {
          toast.error("Something went wrong!!");
          navigate("/dashboard");
        }
      }
    };

    fetchBoardData();
  }, [userData, location.state, navigate, setBoardData]);

  const handleChange = (e) => {
    setBoardTitle(e.target.value);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/updateboard", {
        userId: userData.id,
        boardId: location.state.id,
        boardTitle,
        background,
      });

      if (response.data) {
        navigate(
          ".",
          {
            state: { id: location.state.id, title: boardTitle, bg: background },
          },
          { replace: true },
        );
      }
    } catch (err) {
      toast.error("Something went wrong!!");
    }
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.target.blur();
    }
  };

  const handleDelete = async (e) => {
    try {
      const response = await axios.post("/deleteboard", {
        userId: userData.id,
        boardId: location.state.id,
      });

      if (response.data) {
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error("Something went wrong!!");
    }
  }

  return (
    <div
      className="h-[100vh] w-full text-home-text-light dark:text-home-text-dark"
      style={{ background: background }}
    >
      <nav className="flex h-[7vh] w-full flex-row bg-black bg-opacity-30 text-home-text-light dark:text-home-text-dark">
        <form
          className=" flex w-1/2 items-center justify-start gap-5 px-6 py-2"
          onSubmit={handleUpdate}
        >
          <input
            value={boardTitle}
            className={`h-full w-36 cursor-pointer rounded-lg bg-transparent px-3 py-2 text-lg font-semibold text-white outline-none focus:bg-black focus:bg-opacity-50`}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
          />
        </form>
        <div className="flex w-1/2 items-center justify-end pr-8">
          <Dropdown
            label=""
            dismissOnClick={false}
            renderTrigger={() => (
              <span className="cursor-pointer rounded-lg p-1 text-xl font-medium text-white hover:bg-black hover:bg-opacity-10">
                <LuSettings2 />
              </span>
            )}
            className="mt-4 rounded-md border-0 bg-navbar-background-light p-4 text-home-text-light shadow-md outline-none transition-none dark:border-0 dark:bg-navbar-background-dark dark:text-home-text-dark dark:shadow-md"
          >
            <Dropdown.Item
              className="flex items-center justify-start gap-4 rounded-lg"
              onClick={() => navigate("/dashboard")}
            >
              <span>
                <FaRegCircle />
              </span>
              Background
            </Dropdown.Item>
            <Dropdown.Divider className="my-3 border-b border-border-light dark:border-border-dark" />

            <Dropdown.Item
              className="flex items-center justify-start gap-4 rounded-lg"
              style={{ color: "#F44336" }}
              onClick={handleDelete}
            >
              <span>
                <MdOutlineDelete />
              </span>
              Delete
            </Dropdown.Item>
          </Dropdown>
        </div>
      </nav>
    </div>
  );
};

export default Board;
