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
} from "@dnd-kit/core";
import TaskList from "../components/DragAndDrop/TaskList";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

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
    useSensor(PointerSensor),
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
  const handleDelete = async (e) => {
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

  // This function will return the index of the task
  const getTaskPos = (listId, taskId) => {
    return boardData
      .find((lists) => lists._id === listId)
      .tasks.findIndex((task) => task._id === taskId);
  };

  // This function will be called on drag end
  const handleDragEnd = (e) => {
    const { active, over } = e;

    if (active.id === over?.id) return;

    if (
      active.data.current?.sortable.containerId !==
      over?.data.current?.sortable.containerId
    )
      return;

    const listId = active.data.current?.sortable.containerId;

    setBoardData((boardData) => {
      const temp = [...boardData];

      for (let list of temp) {
        if (list._id === listId) {
          const oldPos = getTaskPos(listId, active.id);
          const newPos = getTaskPos(listId, over.id);

          const updatedTasks = arrayMove(list.tasks, oldPos, newPos);
          list.tasks = updatedTasks;

          return temp;
        }
      }
    });

    // handleUpdateList(e);
  };

  // const handleDragOver = (e) => {
  //   const { active, over } = e;
  //   // console.log(over, over.id, active);

  //   if (!over) return;

  //   const initialContainer = active.data.current?.sortable?.containerId;
  //   const targetContainer = over.data.current?.sortable?.containerId;
  //   // console.log(initialContainer, targetContainer)

  //   if (!initialContainer) return;

  //   setBoardData((boardData) => {
  //     const temp = [...boardData];

  //     if (!targetContainer) {
  //       if (over.id) {
  //         for (let list of boardData) {
  //           if (
  //             list._id !== over.id &&
  //             list.tasks.includes(active.id.toString())
  //           ) {
  //             return temp;
  //           }
  //         }

  //         for (let list of temp) {
  //           if (list._id === initialContainer) {
  //             var task = list.tasks.filter(
  //               (task) => task._id === active.id.toString(),
  //             );
  //             temp.map((list) => {
  //               if (list._id === over?.id) {
  //                 list.tasks.push(task[0]);
  //               }
  //             });
  //           }
  //         }

  //         for (let list of temp) {
  //           if (list._id === initialContainer) {
  //             list.tasks = list.tasks.filter(
  //               (task) => task._id !== active.id.toString(),
  //             );
  //           }
  //         }
  //         return temp;
  //       }
  //       console.log(temp);
  //     }

      //   if (initialContainer === targetContainer) {
      //     const oldPos = getTaskPos(initialContainer, active.id);
      //     const newPos = getTaskPos(initialContainer, over.id);

      //     for (let list of temp) {
      //       if (list._id == initialContainer) {
      //         const updatedTasks = arrayMove(list.tasks, oldPos, newPos);

      //         list = updatedTasks;
      //       }
      //     }
      //   } else {
      //     for (let list of temp) {
      //       if (list._id === initialContainer) {
      //         list.tasks = list.tasks.filter(
      //           (task) => task._id !== active.id.toString(),
      //         );
      //       }
      //     }

      //     const newPos = getTaskPos(targetContainer, over.id);

      //     for (let list of temp) {
      //       if (list._id === targetContainer) {
      //         list.tasks = list.tasks.splice(newPos, 0, active.id.toString());
      //       }
      //     }
      //   }

  //     return temp;
  //   });
  // };

  // It returns the list of Tasks from boardData
  if (boardData) {
    var list = boardData.map((item) => {
      return (
        <TaskList
          key={item._id}
          title={item.title}
          tasks={item.tasks}
          id={item._id}
          onclick={(e) => handleAddTask(e, item._id)}
          boardData={boardData}
          userId={userData.id}
          boardId={location.state.id}
        />
      );
    });
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
                  <Button color="failure" onClick={handleDelete}>
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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          // onDragOver={handleDragOver}
        >
          {list}
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
              <button className="text-lg" onClick={() => setShowAddList(false)}>
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
