import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskItem from "./TaskItem";
import { Card } from "flowbite-react";
import { MdAdd, MdOutlineClose } from "react-icons/md";
import Button1 from "../Button1";
import { useState } from "react";
import axios from "axios";

const TaskList = (props) => {
  const { setNodeRef } = useDroppable({ id: props.id });
  const [showAddTask, setShowAddTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState(props.tasks.map((task) => task._id));

  // This function add tasks in the list
  const handleAddTask = async (e) => {
    e.preventDefault();

    if (props.boardData) {
      const temp = [...props.boardData];

      temp.map((list) => {
        if (list._id === props.id) {
          list.tasks.push({ title: taskTitle });
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
    <Card className="w-64 rounded-2xl bg-list-background-light dark:bg-list-background-dark">
      <div className="mb-1 flex items-center justify-between">
        <h5 className="text-base font-semibold leading-none text-list-text-color-light dark:text-list-text-color-dark">
          {props.title}
        </h5>
      </div>

      <SortableContext
        id={props.id}
        items={tasks}
        strategy={verticalListSortingStrategy}
      >
        <ul ref={setNodeRef} className="flex flex-col gap-3">
          {props.tasks.map((task) => (
            <TaskItem key={task._id} title={task.title} id={task._id} />
          ))}
        </ul>
      </SortableContext>

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
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
          />
          <div className="flex items-center justify-start gap-3">
            <Button1 title="Add task" classname="!px-4 !py-1" />
            <button className="text-lg" onClick={() => setShowAddTask(false)}>
              <MdOutlineClose />
            </button>
          </div>
        </form>
      )}
    </Card>
  );
};

export default TaskList;
