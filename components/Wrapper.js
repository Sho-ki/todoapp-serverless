import Task from "./Task";

import { useContext } from "react";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import TodoContext from "../store/todo-context";

function Wrapper({ tasks }) {
  const sensors = [useSensor(PointerSensor)];

  const ctx = useContext(TodoContext);

  return (
    <div className="wrapper" id="wrapper">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={ctx.handleDragEnd}
      >
        <SortableContext
          items={tasks.map((task) => task)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <Task key={task.id} task={task.todo} id={task.id} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default Wrapper;
