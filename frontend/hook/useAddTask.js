// import { useEffect, useState, useContext } from "react";
// import TodoContext from "../store/todo-context";

// function useAddTask() {
//   const [isValid, setIsValid] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentInput, setCurrentInput] = useState("");

//   const ctx = useContext(TodoContext);
//   useEffect(() => {
//     const checkIsValid = () => {
//       if (currentInput.trim().length === 0) {
//         setIsValid(false);
//         return;
//       }
//       ctx.addTaskHandler(currentInput);
//       setIsLoading(true);
//     };
//     const inputValueHandler = (e) => {
//       if (e.trim().length > 0) {
//         setIsValid(true);
//       }
//       setCurrentInput(e);
//     };

//     checkIsValid(), inputValueHandler(currentInput);
//   }, [currentInput]);
//   return { isValid, isLoading, currentInput };
// }

// export default useAddTask;

import { useEffect, useState, useContext } from "react";
import TodoContext from "../store/todo-context";

function useAddTask(task, { httpContent }) {
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

    useEffect(() => {
      const sendRequest = async () => {
        try {
          await fetch(httpContent.url, {
            headers: httpContent.headers ? httpContent.headers : {},
            method: httpContent.method ? httpContent.method : "GET",
            body: httpContent.body ? JSON.stringify(httpContent.body) : null,
          })
            .then(async (res) => {
              return res.json();
            })
            .then((data) => {
              setIsLoading(false);
              setEnteredTodo(data.data);
            });
        } catch (e) {
          console.log(e);
        }
      };
      sendRequest();
    }, []);

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
}

export default useAddTask;
