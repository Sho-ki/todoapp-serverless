import Task from "./Task";
import useTask from "../hook/useTask";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import { useState } from "react";

function Wrapper({ enteredTodo, setEnteredTodo }) {
  const SortableItem = SortableElement(({ todo, id }) => (
    <Task task={todo} id={id}></Task>
  ));

  const SortableListContainer = SortableContainer(({ enteredTodo }) => (
    <div>
      {enteredTodo.map((todo, i) => (
        <SortableItem key={todo.id} index={i} todo={todo.todo} id={todo.id} />
      ))}
    </div>
  ));

  const onSortEnd = ({ oldIndex, newIndex }, e) => {
    setEnteredTodo((enteredTodo) =>
      arrayMoveImmutable(enteredTodo, oldIndex, newIndex)
    );
  };
  return (
    <div className="wrapper" id="wrapper">
      <SortableListContainer
        onSortEnd={onSortEnd}
        enteredTodo={enteredTodo}
        useDragHandle={true}
      />
    </div>
  );
}

export default Wrapper;
