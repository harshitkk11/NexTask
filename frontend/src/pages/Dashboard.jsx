import axios from "axios";
import { useData } from "../hooks/DataProvider";
import kanbanimg from "../assets/images/kanban-method.png";
import CustomModal from "../components/CustomModal";
import { useEffect, useState } from "react";
import InputField from "../components/InputField";
import { CirclePicker } from "react-color";
import { toast } from "react-toastify";
import { Spinner } from "flowbite-react";
import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { userData } = useData();
  const navigate = useNavigate();

  const [boards, setBoards] = useState({});

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

  const [isDisabled, setIsDisabled] = useState(false);
  const [isExist, setIsExist] = useState(null);
  const [submit, setSubmit] = useState("Create");

  const [createBoard, setCreateBoard] = useState({
    boardtitle: "",
    background: randomElement,
  });

  const [errors, setErrors] = useState({
    boardtitle: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateBoard({ ...createBoard, [name]: value });
  };

  const handleChangeComplete = (color) => {
    setCreateBoard({ ...createBoard, background: color.hex });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    setSubmit(<Spinner aria-label="Please wait" />);

    if (createBoard.boardtitle) {
      setErrors({ boardtitle: "" });

      // call api
      try {
        const response = await axios.post("/createboard", {
          username: userData.username,
          boardtitle: createBoard.boardtitle,
          background: createBoard.background,
        });

        if (response.data.error) {
          toast.error(response.data.error);
        } else if (response.data) {
          setCreateBoard({
            boardtitle: "",
            background: randomElement,
          });
          window.location.reload();
        }
      } catch (error) {
        toast.error("Something went wrong!!");
      }
    } else {
      setErrors({ boardtitle: "Board title is required" });
    }
    setSubmit("Create");
    setIsDisabled(false);
  };

  const handleClick = (title) => {
    navigate(`/board?b=${title}`);
  };

  //fetch boards data
  useEffect(() => {
    async function fetchData() {
      if (userData.username) {
        try {
          const response = await axios.post("/getboards", {
            username: userData.username,
          });

          if (response.data) {
            setBoards(JSON.parse(JSON.stringify(response.data)));
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
  }, [userData]);

  const boardlist = boards.boarddata;

  if (boardlist) {
    var list = boardlist.map((board, index) => {
      return (
        <CustomButton
          key={index}
          title={board.boardtitle}
          classname={`w-60 h-24 !justify-start !items-start text-start font-semibold tracking-tighter hover:shadow-sm hover:shadow-background-dark dark:shadow-md dark:hover:shadow-border-color-dark overflow-hidden`}
          style={{ background: `${board.background}` }}
          onclick={() => handleClick(board.boardtitle)}
        />
      );
    });
  }

  return (
    <main className="h-[100vh] w-[100%] overflow-y-auto bg-dashboard-bg-light p-[1.5em] dark:bg-dashboard-bg-dark">
      <h3 className="mb-10 text-2xl font-semibold text-text-color-light dark:text-text-color-dark">
        Boards
      </h3>
      <div className="flex flex-wrap items-center justify-center gap-10 p-5">
        {isExist === "notexist" ? (
          <div className="flex h-[60vh] w-[100%] flex-col items-center justify-center gap-10">
            <img src={kanbanimg} alt="kanban-method" className="md:h-[60%]" />
            <p className="text-center text-lg text-text-color-light dark:text-text-color-dark">
              Boards in NexTask are where tasks move between lists, helping you
              manage projects efficiently.
            </p>
            <CustomModal
              title="Create new board"
              bClass="px-10 py-1 bg-button-background-light dark: bg-button-background-dark !text-md rounded-md"
              heading="Create new Board"
              onsubmit={(e) => handleSubmit(e)}
              submitbtn="Create"
              popoverform={
                <>
                  <InputField
                    label="Board Title"
                    type="text"
                    name="boardtitle"
                    placeholder="Board Title"
                    onchange={(e) => handleChange(e)}
                    value={createBoard.title}
                    disable={isDisabled}
                    error={errors.boardtitle}
                    autocomplete="title"
                  />
                  <div className="flex flex-col gap-4">
                    <label className="text-sm font-medium">Background</label>
                    <CirclePicker
                      color={createBoard.background}
                      onChangeComplete={handleChangeComplete}
                    />
                  </div>
                </>
              }
            />
          </div>
        ) : isExist === "exist" ? (
          <div className="flex w-full flex-row flex-wrap items-center justify-start gap-10">
            <CustomModal
              title="Create new board"
              bClass="w-60 h-24 flex justify-center items-center text-xl bg-button-background-light dark: bg-button-background-dark !text-md rounded-md font-semibold"
              heading="Create new Board"
              onsubmit={(e) => handleSubmit(e)}
              submitbtn={submit}
              isdisable={isDisabled}
              popoverform={
                <>
                  <InputField
                    label="Board Title"
                    type="text"
                    name="boardtitle"
                    placeholder="Board Title"
                    onchange={(e) => handleChange(e)}
                    value={createBoard.title}
                    disable={isDisabled}
                    error={errors.boardtitle}
                    autocomplete="title"
                  />
                  <div className="flex flex-col gap-4">
                    <label className="text-sm font-medium">Background</label>
                    <CirclePicker
                      color={createBoard.background}
                      onChangeComplete={handleChangeComplete}
                    />
                  </div>
                </>
              }
            />
            {list}
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Dashboard;
