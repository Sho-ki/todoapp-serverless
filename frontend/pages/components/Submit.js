import { useEffect, useState } from "react";

const Submit = ({ setAddTask }) => {
  const [currentInput, setCurrentInput] = useState("");
  const inputValueHandler = (e) => {
    setCurrentInput(e.target.value);
  };

  const submitHandler = async (task) => {
    const res = await fetch("http://localhost:8888/add-todos", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        todo: task,
      }),
    });

    setAddTask();
    setCurrentInput("");
  };
  return (
    <>
      <input
        type="text"
        name="todo"
        onChange={inputValueHandler}
        value={currentInput}
      />
      <button
        type="submit"
        id="submit"
        className="submitBtn"
        onClick={() => submitHandler(currentInput)}
      >
        SUBMIT
      </button>
    </>
  );
};

export default Submit;
