import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Modal, Spinner } from "flowbite-react";
import Button1 from "../Button1";
import axios from "axios";
import { toast } from "react-toastify";
import { VscEdit } from "react-icons/vsc";

const TaskItem = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [taskData, setTaskData] = useState({
    title: props.title,
    description: props.description,
  });

  const [submit, setSubmit] = useState("Save");

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.id,
      data: {
        type: "task",
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const cancelHandler = (e) => {
    e.preventDefault();

    setTaskData({ title: props.title, description: props.description });
    setOpenModal(false);
  };

  // This function will Update list in a board
  const handleUpdateTask = async (e) => {
    e.preventDefault();

    setIsDisabled(true);
    setSubmit(
      <>
        <Spinner aria-label="Spinner" size="sm" />
      </>,
    );

    if (props.boardData) {
      const temp = [...props.boardData];

      const container = temp.find((list) => list._id === props.containerId);

      const task = container.tasks.find((task) => task._id === props.id);

      task.title = taskData.title;
      task.description = taskData.description;

      try {
        if (props.userId) {
          const response = await axios.post("/updatelist", {
            userId: props.userId,
            boardId: props.boardId,
            listData: temp,
          });

          if (response.data) {
            setIsDisabled(false);
            setSubmit("Save");
            setOpenModal(false);
            window.location.reload();
          }
        }
      } catch (err) {
        toast.error("Something went wrong !!");
      }
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    setIsDisabled(true);

    if (props.boardData) {
      const temp = [...props.boardData];

      const container = temp.find((list) => list._id === props.containerId);

      const taskIndex = container.tasks.findIndex(
        (task) => task._id === props._id,
      );

      container.tasks.splice(taskIndex, 1);

      try {
        if (props.userId) {
          const response = await axios.post("/updatelist", {
            userId: props.userId,
            boardId: props.boardId,
            listData: temp,
          });

          if (response.data) {
            setIsDisabled(false);
            setOpenModal(false);
            window.location.reload();
          }
        }
      } catch (err) {
        toast.error("Something went wrong !!");
      }
    }
  };

  return (
    <>
      <li
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
        className="peer touch-auto flex w-full items-center justify-between rounded-xl bg-card-backgroung-light p-3 text-list-text-color-light dark:bg-card-backgroung-dark dark:text-list-text-color-dark"
        onClick={() => setOpenModal(true)}
      >
        {taskData.title}
        <span className="invisible text-sm peer-hover:visible">
          <VscEdit />
        </span>
      </li>

      <Modal
        show={openModal}
        size="md"
        onClose={cancelHandler}
        popup
        className="bg-black"
      >
        <Modal.Header className="rounded-t-lg bg-navbar-background-light text-home-text-light dark:bg-navbar-background-dark dark:text-home-text-dark" />
        <Modal.Body className="flex flex-col justify-start gap-5 rounded-b-lg bg-navbar-background-light text-home-text-light dark:bg-navbar-background-dark dark:text-home-text-dark">
          <div className="flex justify-between items-center px-3">
            <h4 className="text-lg font-medium">Edit Task</h4>
            <button
              className="rounded-lg border border-error px-3 py-1 text-sm text-error"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
          <form
            className="flex flex-col justify-start gap-5"
            onSubmit={handleUpdateTask}
          >
            <div className="flex flex-col items-start justify-center gap-2">
              {/* <label
                  htmlFor="title"
                  className="px-1 text-base font-medium text-home-text-light dark:text-home-text-dark"
                >
                  Title{" "}
                </label> */}
              <input
                className={`w-full cursor-pointer rounded-lg bg-gray-400 bg-opacity-40 px-3 py-3 text-sm font-medium text-list-text-color-light outline-none dark:bg-black dark:bg-opacity-30 dark:text-list-text-color-dark`}
                id="title"
                name="title"
                placeholder="Title"
                value={taskData.title}
                required
                onChange={handleChange}
                disabled={isDisabled}
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-2">
              {/* <label
                  htmlFor="title"
                  className="px-1 text-base font-medium text-home-text-light dark:text-home-text-dark"
                >
                  Description{" "}
                </label> */}
              <textarea
                id="description"
                name="description"
                rows={10}
                className="w-full cursor-pointer resize-none rounded-lg border-0 bg-gray-400 bg-opacity-40 px-3 py-3 text-sm font-medium text-list-text-color-light outline-none dark:bg-black dark:bg-opacity-30 dark:text-list-text-color-dark"
                placeholder="Description"
                value={taskData.description}
                onChange={handleChange}
                disabled={isDisabled}
              />
            </div>
            <div className="flex items-center justify-start gap-2">
              <Button1
                title={submit}
                classname="text-sm !px-10"
                disabled={isDisabled}
              />
              <button
                className="rounded-lg border border-border-light px-9 py-2 text-sm font-medium hover:bg-gray-400 hover:bg-opacity-30 dark:border-border-dark dark:hover:bg-black dark:hover:bg-opacity-30"
                onClick={cancelHandler}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TaskItem;
