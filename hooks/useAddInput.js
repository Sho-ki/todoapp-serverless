import { useState, useContext } from "react";

import TodoContext from "../store/todo-context";

function useAddInput() {
  const ctx = useContext(TodoContext);
  const [currentInput, setCurrentInput] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inputValueHandler = (e) => {
    if (e.target.value.trim().length > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    setCurrentInput(e.target.value);
  };

  const submit = () => {
    ctx.addTaskHandler(currentInput);
    setIsLoading(false);
    setCurrentInput("");
    setIsValid(false);
  };

  return [currentInput, inputValueHandler, isValid, isLoading, submit];
}

export default useAddInput;
