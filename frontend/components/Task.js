import { useState, useContext } from "react";
import useAddTask from "../hook/useAddTask";
import useTask from "../hook/useTask";
import TodoContext from "../store/todo-context";

function Task({ task, id }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentInput, setCurrentInput] = useState(task);
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const ctx = useContext(TodoContext);

  const startEditMode = () => {
    setIsEditing(true);
  };

  const endEditMode = async () => {
    if (currentInput.trim().length === 0) {
      setIsValid(false);

      return;
    }

    await fetch("/api/edit-todos/" + id, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ newValue: currentInput }),
    });
    setIsEditing(false);
    setIsValid(true);
    setIsLoading(false);
  };
  const editTaskHandler = (e) => {
    if (e.target.value.trim().length > 0) {
      setIsValid(true);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
    setCurrentInput(e.target.value);
  };

  return (
    <div className="item">
      <i className="icon fa fa-bars"></i>
      {!isEditing && (
        <>
          <span className="txt">{currentInput}</span>
          <i className="edit fa fa-edit" onClick={startEditMode}></i>
          <i
            className="trash fa fa-trash"
            onClick={() => ctx.deleteTaskHandler(id)}
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
              editTaskHandler(e);
            }}
          />
          <button
            value="OK"
            disabled={isLoading}
            onClick={() => {
              endEditMode();
              setIsLoading(true);
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
