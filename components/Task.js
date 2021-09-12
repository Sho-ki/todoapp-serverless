import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useContext } from "react";

import TodoContext from "../store/todo-context";
import useInput from "../hooks/useEditInput";

function Task({ task, id }) {
  const ctx = useContext(TodoContext);

  const [
    currentInput,
    startEditMode,
    endEditMode,
    onEditChange,
    isEditing,
    isValid,
    isLoading,
  ] = useInput(task, id);

  const { setNodeRef, attributes, listeners, transition, transform } =
    useSortable({
      id,
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div className="item" id={id} style={style}>
      <i
        className="icon fa fa-bars"
        ref={setNodeRef}
        {...attributes}
        {...listeners}
      ></i>
      {!isEditing && (
        <>
          <span className="txt">{currentInput}</span>
          <i className="edit fa fa-edit" onClick={startEditMode}></i>
          <i
            className="trash fa fa-trash"
            onClick={() => {
              ctx.deleteTaskHandler(id);
            }}
          ></i>
        </>
      )}

      {isEditing && (
        <>
          <input
            type="text"
            value={currentInput}
            className={`${!isValid && "invalid"}`}
            onChange={(e) => {
              onEditChange(e);
            }}
          />
          <button
            value="OK"
            disabled={isLoading}
            onClick={() => {
              endEditMode();
            }}
          >
            OK
          </button>
        </>
      )}
    </div>
  );
}

export default Task;
