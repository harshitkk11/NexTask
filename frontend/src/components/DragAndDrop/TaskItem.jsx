import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TaskItem = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
      };

  return (
    <li
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="bg-card-backgroung-light dark:bg-card-backgroung-dark w-full rounded-xl p-3 text-list-text-color-light dark:text-list-text-color-dark"
    >
      {props.title}
    </li>
  );
};

export default TaskItem;
