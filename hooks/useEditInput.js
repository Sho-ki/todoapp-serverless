import { useState, useContext } from "react";

import TodoContext from "../store/todo-context";

function useInput(task, id) {
  const ctx = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [currentInput, setCurrentInput] = useState(task);
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const startEditMode = () => {
    setIsEditing(true);
  };

  const endEditMode = () => {
    if (currentInput.trim().length === 0) {
      setIsValid(false);
      return;
    }
    ctx.editTaskHandler(id, currentInput);
    setIsEditing(false);
    setIsValid(true);
    setIsLoading(false);
  };

  const onEditChange = (e) => {
    if (e.target.value.trim().length > 0) {
      setIsValid(true);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
    setCurrentInput(e.target.value);
  };

  return [
    currentInput,
    startEditMode,
    endEditMode,
    onEditChange,
    isEditing,
    isValid,
    isLoading,
  ];
}

export default useInput;
