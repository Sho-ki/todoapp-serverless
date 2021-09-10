import { useState, useContext } from "react";
import TodoContext from "../store/todo-context";
import useAddTask from "../hook/useAddTask";

const Submit = () => {
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

  const checkIsValid = () => {
    if (currentInput.trim().length === 0) {
      setIsValid(false);
      setIsLoading(false);
      return;
    }

    ctx.addTaskHandler(currentInput).then(() => setIsLoading(false));
    setCurrentInput("");
    setIsValid(false);
  };

  const ctx = useContext(TodoContext);

  return (
    <>
      <div className="formArea">
        <input
          type="text"
          name="todo"
          onChange={inputValueHandler}
          value={currentInput}
          className={`${!isValid && "invalid"}`}
        />

        <button
          type="submit"
          id="submit"
          className="submitBtn"
          disabled={isLoading || !isValid}
          onClick={() => {
            setIsLoading(true);
            checkIsValid();
          }}
        >
          SUBMIT
        </button>
      </div>
    </>
  );
};

export default Submit;
