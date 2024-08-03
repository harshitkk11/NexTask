import { useLocation, useNavigate } from "react-router-dom";
import { useData } from "../hooks/DataProvider";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Dropdown, Button, Modal } from "flowbite-react";
import { LuSettings2 } from "react-icons/lu";
import { TiDeleteOutline } from "react-icons/ti";
import { FaRegCircle } from "react-icons/fa6";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { MdAdd, MdOutlineClose } from "react-icons/md";
import { CirclePicker } from "react-color";
import Button1 from "../components/Button1";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import TaskList from "../components/DragAndDrop/TaskList";
import TaskItem from "../components/DragAndDrop/TaskItem";

const Board = () => {
  const initialized = useRef(false);

  const { userData } = useData(); // Data Provider hook (provides user data - name, id and email)

  const navigate = useNavigate();
  const location = useLocation();

  const [boardTitle, setBoardTitle] = useState("");
  const [background, setBackground] = useState("");

  const [boardData, setBoardData] = useState([]);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openBgModal, setOpenBgModal] = useState(false);

  const [showAddList, setShowAddList] = useState(false);
  const [listTitle, setListTitle] = useState("");

  const sensors = useSensors(
    useSensor(TouchSensor),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleChangeComplete = (color) => {
    setBackground(color.hex);
  };

  useEffect(() => {
    if (!location.state) {
      navigate("/dashboard");
    } else {
      setBoardTitle(location.state.title);
      setBackground(location.state.bg);
    }

    const fetchBoardData = async () => {
      if (!location.state) {
        navigate("/dashboard");
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

  const cancelHandler = (e) => {
    e.preventDefault()
    
    setShowAddList(false);
  };

  // handle the update of the board title and background
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

  // this function focus out the input field after board title update
  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.target.blur();
    }
  };

  // this function handle the deletion of the board
  const handleDeleteBoard = async (e) => {
    try {
      const response = await axios.post("/deleteboard", {
        userId: userData.id,
        boardId: location.state.id,
      });

      if (response.data) {
        setOpenDeleteModal(false);
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error("Something went wrong!!");
    }
  };

  // This function will create list in a board
  const handleAddList = async (e) => {
    e.preventDefault();

    try {
      if (userData.id) {
        const response = await axios.post("/createlist", {
          userId: userData.id,
          boardId: location.state.id,
          listTitle,
        });

        if (response.data) {
          window.location.reload();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  // This function will Update list in a board
  const handleUpdateList = async (e) => {
    try {
      if (userData.id) {
        await axios.post("/updatelist", {
          userId: userData.id,
          boardId: location.state.id,
          listData: boardData,
        });
      }
    } catch (err) {
      toast.error("Something went wrong !!");
      console.log(err);
    }
  };

  // This function will return the value of items
  function findValueOfItems(id, type) {
    if (type === "container") {
      return boardData.find((container) => container._id === id);
    }
    if (type === "item") {
      return boardData.find((container) =>
        container.tasks.find((task) => task._id === id),
      );
    }
  }

  const getContainerPos = (containerId) => {
    return boardData.findIndex((container) => container._id === containerId);
  };

  // This function will return the index of the task
  const getTaskPos = (container, taskId) => {
    return container.tasks.findIndex((task) => task._id === taskId);
  };

  const handleDragMove = (e) => {
    const { active, over } = e;

    if (
      active.data.current.type.includes("task") &&
      over?.data.current.type.includes("task") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "item");

      if (!activeContainer || !overContainer) return;

      const activeContainerIndex = getContainerPos(activeContainer._id);
      const overContainerIndex = getContainerPos(overContainer._id);

      const activeTaskIndex = getTaskPos(activeContainer, active.id);
      const overTaskIndex = getTaskPos(overContainer, over?.id);

      if (activeContainerIndex === overContainerIndex) {
        let temp = [...boardData];
        temp[activeContainerIndex].tasks = arrayMove(
          temp[activeContainerIndex].tasks,
          activeTaskIndex,
          overTaskIndex,
        );

        setBoardData(temp);
      } else {
        let temp = [...boardData];
        const [removeditem] = temp[activeContainerIndex].tasks.splice(
          activeTaskIndex,
          1,
        );
        temp[overContainerIndex].tasks.splice(overTaskIndex, 0, removeditem);
        setBoardData(temp);
      }
    }

    if (
      active.data.current.type.includes("task") &&
      over?.data.current.type.includes("container") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "container");

      if (!activeContainer || !overContainer) return;

      const activeContainerIndex = getContainerPos(activeContainer._id);
      const overContainerIndex = getContainerPos(overContainer._id);

      const activeTaskIndex = getTaskPos(activeContainer, active.id);

      let temp = [...boardData];
      const [removeditem] = temp[activeContainerIndex].tasks.splice(
        activeTaskIndex,
        1,
      );
      temp[overContainerIndex].tasks.push(removeditem);
      setBoardData(temp);
    }
  };

  //  This is the function that handles the sorting of the containers and items on drag end.
  function handleDragEnd(e) {
    const { active, over } = e;

    // Handling item Sorting
    if (
      active.data.current.type.includes("task") &&
      over?.data.current.type.includes("task") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      const activeContainer = findValueOfItems(active.id, "task");
      const overContainer = findValueOfItems(over.id, "task");

      if (!activeContainer || !overContainer) return;

      const activeContainerIndex = getContainerPos(activeContainer._id);
      const overContainerIndex = getContainerPos(overContainer._id);

      const activeTaskIndex = getTaskPos(activeContainer, active.id);
      const overTaskIndex = getTaskPos(overContainer, over?.id);

      // In the same container
      if (activeContainerIndex === overContainerIndex) {
        let temp = [...boardData];
        temp[activeContainerIndex].tasks = arrayMove(
          temp[activeContainerIndex].tasks,
          activeTaskIndex,
          overTaskIndex,
        );
        setBoardData(temp);
      } else {
        // In different containers
        let temp = [...boardData];
        const [removeditem] = temp[activeContainerIndex].tasks.splice(
          activeTaskIndex,
          1,
        );
        temp[overContainerIndex].tasks.splice(overTaskIndex, 0, removeditem);
        setBoardData(temp);
      }
    }

    // Handling item dropping into Container
    if (
      active.data.current.type.includes("task") &&
      over?.data.current.type.includes("container") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "container");

      if (!activeContainer || !overContainer) return;

      const activeContainerIndex = getContainerPos(activeContainer._id);
      const overContainerIndex = getContainerPos(overContainer._id);

      const activeTaskIndex = getTaskPos(activeContainer, active.id);

      let temp = [...boardData];
      const [removeditem] = temp[activeContainerIndex].tasks.splice(
        activeTaskIndex,
        1,
      );
      temp[overContainerIndex].tasks.push(removeditem);
      setBoardData(temp);
    }
    handleUpdateList(e);
  }

  // this function handle the deletion of the board
  const handleDeleteList = async (e, containerId) => {
    const temp = [...boardData];

    const containerIndex = getContainerPos(containerId);

    temp.splice(containerIndex, 1);

    setBoardData(temp);

    try {
      if (userData.id) {
        await axios.post("/updatelist", {
          userId: userData.id,
          boardId: location.state.id,
          listData: temp,
        });
      }
    } catch (err) {
      toast.error("Something went wrong !!");
      console.log(err);
    }
  };

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
              className="flex gap-1 rounded-lg"
              onClick={() => setOpenBgModal(true)}
              icon={FaRegCircle}
            >
              Change Background
            </Dropdown.Item>

            <Dropdown.Item
              className="flex gap-1 rounded-lg"
              style={{ color: "#F44336" }}
              onClick={() => setOpenDeleteModal(true)}
              icon={TiDeleteOutline}
            >
              Delete
            </Dropdown.Item>
          </Dropdown>

          {/* Modal for confirming board deletion */}
          <Modal
            show={openDeleteModal}
            size="md"
            onClose={() => setOpenDeleteModal(false)}
            popup
            className="bg-black"
          >
            <Modal.Header className="rounded-t-lg bg-navbar-background-light text-home-text-light dark:bg-navbar-background-dark dark:text-home-text-dark" />
            <Modal.Body className="rounded-b-lg bg-navbar-background-light text-home-text-light dark:bg-navbar-background-dark dark:text-home-text-dark">
              <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200 " />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this board?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button color="failure" onClick={handleDeleteBoard}>
                    {"Yes, I'm sure"}
                  </Button>
                  <Button
                    color="gray"
                    onClick={() => setOpenDeleteModal(false)}
                  >
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>

          {/* Modal for updating background of board */}
          <Modal
            show={openBgModal}
            size="md"
            onClose={() => {
              setBackground(location.state.bg);
              setOpenBgModal(false);
            }}
            popup
            className="bg-black"
          >
            <Modal.Header className="rounded-t-lg bg-navbar-background-light text-home-text-light dark:bg-navbar-background-dark dark:text-home-text-dark" />
            <Modal.Body className="rounded-b-lg bg-navbar-background-light text-home-text-light dark:bg-navbar-background-dark dark:text-home-text-dark">
              <div className="flex flex-col items-center justify-center gap-5 text-center">
                <div className="flex w-full flex-col items-center justify-center gap-4">
                  <label className="w-full text-xl font-normal text-home-text-light dark:text-home-text-dark">
                    Change Background
                  </label>
                  <CirclePicker
                    color={background}
                    onChangeComplete={handleChangeComplete}
                    className="mt-5 w-full"
                  />
                </div>
                <Button1
                  title="Save"
                  classname="mt-5 w-1/2"
                  onclick={(e) => {
                    handleUpdate(e);
                    setOpenBgModal(false);
                  }}
                />
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </nav>
      <div className="flex h-[90vh] w-full flex-row flex-wrap items-start justify-center gap-5 overflow-auto p-10 md:justify-start">
        {/* Dnd kit for drag and drop */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragMove={handleDragMove}
          // onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {boardData &&
            boardData.map((container) => {
              return (
                <TaskList
                  key={container._id}
                  id={container._id}
                  title={container.title}
                  onclick={(e) => handleDeleteList(e, container._id)}
                  boardData={boardData}
                  userId={userData.id}
                  boardId={location.state.id}
                >
                  <SortableContext
                    id={container._id}
                    items={container.tasks.map((task) => task._id)}
                  >
                    <ul className="flex flex-col gap-3">
                      {container.tasks.map((task) => (
                        <TaskItem
                          key={task._id}
                          title={task.title}
                          description={task.description}
                          containerId={container._id}
                          id={task._id}
                          boardData={boardData}
                          userId={userData.id}
                          boardId={location.state.id}
                        />
                      ))}
                    </ul>
                  </SortableContext>
                </TaskList>
              );
            })}
        </DndContext>

        {!showAddList ? (
          <button
            className="flex w-60 items-center justify-start gap-2 rounded-xl bg-black bg-opacity-25 py-3 pl-5 text-white shadow-lg hover:bg-white hover:bg-opacity-10"
            onClick={() => setShowAddList(true)}
          >
            <span className="text-xl">
              <MdAdd />
            </span>
            {boardData.length > 0 ? "Add another list" : "Add a list"}
          </button>
        ) : (
          // form to take input for list title
          <form
            className="flex w-60 flex-col items-start justify-center gap-2 rounded-xl bg-list-background-light bg-opacity-70 px-5 py-3 dark:bg-list-background-dark dark:bg-opacity-70"
            onSubmit={handleAddList}
          >
            <input
              type="text"
              className="w-full rounded-xl bg-white bg-opacity-55 text-sm dark:bg-black dark:bg-opacity-55"
              autoFocus
              value={listTitle}
              onChange={(e) => setListTitle(e.target.value)}
              required
            />
            <div className="flex items-center justify-start gap-3">
              <Button1 title="Add list" classname="!px-4 !py-1" />
              <button className="text-lg" onClick={cancelHandler}>
                <MdOutlineClose />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Board;
