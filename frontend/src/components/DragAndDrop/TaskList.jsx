import { useState } from "react";
import axios from "axios";
import { useDroppable } from "@dnd-kit/core";
import Button1 from "../Button1";
import { MdAdd, MdOutlineClose, MdDeleteOutline } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { toast } from "react-toastify";
import { Dropdown } from "flowbite-react";

const TaskList = (props) => {
  const { setNodeRef } = useDroppable({
    id: props.id,
    data: {
      type: "container",
    },
  });

  const [listTitle, setListTitle] = useState(props.title);

  const [showAddTask, setShowAddTask] = useState(false);
  const [taskData, setTaskData] = useState({
    title: "",
  });

  const handleChange = (e) => {
    setListTitle(e.target.value);
  };

  // this function focus out the input field after list title update
  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.target.blur();
    }
  };

  const cancelHandler = (e) => {
    e.preventDefault()
    
    setShowAddTask(false);
  };

  // This function will Update list in a board
  const handleUpdateList = async (e) => {
    e.preventDefault();

    if (props.boardData) {
      const temp = [...props.boardData];

      temp.map((list) => {
        if (list._id === props.id) {
          list.title = listTitle;
        }
      });

      try {
        if (props.userId) {
          await axios.post("/updatelist", {
            userId: props.userId,
            boardId: props.boardId,
            listData: temp,
          });
        }
      } catch (err) {
        toast.error("Something went wrong !!");
      }
    }
  };

  // This function add tasks in the list
  const handleAddTask = async (e) => {
    e.preventDefault();

    if (props.boardData) {
      const temp = [...props.boardData];

      temp.map((list) => {
        if (list._id === props.id) {
          list.tasks.push(taskData);
        }
      });

      try {
        const response = await axios.post("/addtask", {
          userId: props.userId,
          boardId: props.boardId,
          newList: temp,
        });

        if (response.data) {
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div
      ref={setNodeRef}
      className="flex w-64 flex-col justify-start gap-5 rounded-2xl bg-list-background-light p-5 dark:bg-list-background-dark"
    >
      <div className=" flex items-center justify-between">
        <form onSubmit={handleUpdateList}>
          <input
            value={listTitle}
            className={`w-full cursor-pointer rounded-lg bg-transparent px-3 py-1 text-base font-semibold leading-none text-list-text-color-light outline-none focus:bg-white focus:bg-opacity-80 dark:text-list-text-color-dark dark:focus:bg-black dark:focus:bg-opacity-30`}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
          />
        </form>
        <Dropdown
          label=""
          dismissOnClick={false}
          renderTrigger={() => (
            <span className="cursor-pointer rounded-md p-2 hover:bg-black hover:bg-opacity-25">
              <BsThreeDots />
            </span>
          )}
          className="rounded-md border-0 bg-navbar-background-light p-1 text-home-text-light shadow-md outline-none transition-none dark:border-0 dark:bg-navbar-background-dark dark:text-home-text-dark dark:shadow-md"
        >
          <Dropdown.Item
            className="flex gap-1 rounded-md"
            style={{ color: "#F44336" }}
            onClick={props.onclick}
            icon={MdDeleteOutline}
          >
            Delete
          </Dropdown.Item>
        </Dropdown>
      </div>

      {props.children}

      {!showAddTask ? (
        <button
          className="flex w-full items-center justify-start gap-2 rounded-xl bg-black bg-opacity-25 py-3 pl-5 text-list-text-color-light shadow-lg hover:bg-white hover:bg-opacity-10 dark:text-list-text-color-dark"
          onClick={() => setShowAddTask(true)}
        >
          <span className="text-xl">
            <MdAdd />
          </span>
          Add Task
        </button>
      ) : (
        // form to take input for list title
        <form
          className="flex w-full flex-col items-start justify-center gap-2 rounded-xl bg-list-background-light bg-opacity-70 dark:bg-list-background-dark dark:bg-opacity-70"
          onSubmit={handleAddTask}
        >
          <input
            type="text"
            className="w-full rounded-xl bg-white bg-opacity-55 text-sm dark:bg-black dark:bg-opacity-55"
            autoFocus
            value={taskData.title}
            onChange={(e) =>
              setTaskData({ ...taskData, title: e.target.value })
            }
            required
          />
          <div className="flex items-center justify-start gap-3">
            <Button1 title="Add task" classname="!px-4 !py-1" />
            <button className="text-lg" onClick={cancelHandler}>
              <MdOutlineClose />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TaskList;
