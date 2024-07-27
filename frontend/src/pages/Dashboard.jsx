import { useEffect, useState } from "react";
import axios from "axios";
import { useData } from "../hooks/DataProvider";
import kanbanimg from "../assets/images/kanban-method.png";
import Button1 from "../components/Button1";
import CustomModal from "../components/CustomModal";
import CBModalContent from "../components/CBModalContent";
import { toast } from "react-toastify";
import { Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const { userData } = useData();

  const [boards, setBoards] = useState({});
  const [isExist, setIsExist] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [submit, setSubmit] = useState("Create");

  const [errors, setErrors] = useState({
    boardtitle: "",
  });

  const boardColors = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#ff5722",
    "#795548",
    "#607d8b",
  ];

  const randomElement =
    boardColors[Math.floor(Math.random() * boardColors.length)];

  const [createBoard, setCreateBoard] = useState({
    boardtitle: "",
    background: randomElement,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateBoard({ ...createBoard, [name]: value });
  };

  const handleChangeComplete = (color) => {
    setCreateBoard({ ...createBoard, background: color.hex });
  };

  const handleCreateBoard = async (e) => {
    e.preventDefault();

    setIsDisabled(true);
    setSubmit(
      <>
        <Spinner aria-label="Spinner" size="sm" />
        <span className="pl-3">Please Wait...</span>
      </>,
    );

    if (!createBoard.boardtitle) {
      setErrors({ boardtitle: "Board title is required" });
      setSubmit("Create");
      setIsDisabled(false);
      return;
    }

    setErrors({ boardtitle: "" });

    // call api
    try {
      const response = await axios.post("/createboard", {
        userId: userData.id,
        boardtitle: createBoard.boardtitle,
        background: createBoard.background,
      });

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setCreateBoard({
          boardtitle: "",
          background: randomElement,
        });
        setBoards(response.data);

        const lastBoard =
          response.data.boarddata[response.data.boarddata.length - 1];

        navigate("/board?", {
          state: {
            id: lastBoard._id,
            title: lastBoard.boardtitle,
            bg: lastBoard.background,
          },
        });
      }
    } catch (error) {
      toast.error("Something went wrong!!");
    }

    setSubmit("Create");
    setIsDisabled(false);
  };

  const handleOpen = (id, title, bg) => {
    navigate("/board", { state: { id: id, title: title, bg: bg } });
  };

  //fetch boards data
  useEffect(() => {
    async function fetchData() {
      if (userData.id) {
        try {
          const response = await axios.post("/getboards", {
            userId: userData.id,
          });

          if (response.data) {
            setBoards(response.data);
            if (response.data.boarddata.length === 0) {
              setIsExist("notexist");
            } else {
              setIsExist("exist");
            }
          } else {
            setIsExist("notexist");
          }
        } catch (err) {
          toast.error("Something went wrong!!");
        }
      }
    }

    fetchData();
  }, [userData, createBoard]);

  const boardlist = boards.boarddata;

  if (boardlist) {
    var list = boardlist.map((board, index) => {
      return (
        <button
          key={index}
          className={`h-24 w-56 rounded-lg px-5 py-2 text-start text-[1.1rem] font-medium text-home-button-text-light opacity-100 transition duration-300 ease-in-out hover:bg-home-button-hover-light hover:opacity-70 dark:text-home-button-text-dark dark:hover:bg-home-button-hover-dark`}
          style={{ background: board.background }}
          onClick={() =>
            handleOpen(board._id, board.boardtitle, board.background)
          }
        >
          {board.boardtitle}
        </button>
      );
    });
  }

  return (
    <main className="h-[100vh] w-full bg-home-background-light p-[1.5em] dark:bg-home-background-dark">
      <h3 className="mb-10 text-2xl font-semibold text-home-text-light dark:text-home-text-dark">
        Boards
      </h3>

      {isExist === "notexist" ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-10">
          <img src={kanbanimg} alt="kanban-method" className="md:h-[60%]" />

          <p className="text-center text-base text-home-text-light dark:text-home-text-dark sm:text-xl">
            Boards in NexTask are where tasks move between lists, helping you
            manage projects efficiently.
          </p>

          <CustomModal
            buttonStyle="px-10 py-4 rounded-lg"
            content={
              <CBModalContent
                // InputField
                onchange={(e) => handleChange(e)}
                value={createBoard.boardtitle}
                disable={isDisabled}
                error={errors.boardtitle}
                // Background
                color={createBoard.background}
                onchangecomplete={handleChangeComplete}
                // Submit button
                buttonTitle={submit}
                onsubmit={(e) => handleCreateBoard(e)}
              />
            }
          />
        </div>
      ) : isExist === "exist" ? (
        <div className="flex w-full flex-wrap items-start justify-center gap-10 sm:justify-start">
          <CustomModal
            buttonStyle="w-56 h-24 rounded-lg !bg-other-button-light !dark:bg-other-button-dark"
            content={
              <CBModalContent
                // InputField
                onchange={(e) => handleChange(e)}
                value={createBoard.title}
                disable={isDisabled}
                error={errors.boardtitle}
                // Background
                color={createBoard.background}
                onchangecomplete={handleChangeComplete}
                // Submit button
                buttonTitle={submit}
                onsubmit={(e) => handleCreateBoard(e)}
              />
            }
          />
          {list}
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner
            aria-label="Spinner"
            size="lg"
            className="h-40 w-40 rounded-[70px] border-4 border-home-button-background-light dark:border-home-button-background-dark sm:h-52 sm:w-52 sm:rounded-[80px]"
          />
        </div>
      )}
    </main>
  );
};

export default Dashboard;
