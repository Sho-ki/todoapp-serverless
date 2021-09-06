import { useState, useContext } from "react";
import TodoContext from "../../store/todo-context";
function Task({ task, id, getDeleteId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentInput, setCurrentInput] = useState(task);

  const ctx = useContext(TodoContext);

  const startEditMode = () => {
    setIsEditing(true);
  };

  const endEditMode = async () => {
    setIsEditing(false);
    await fetch("http://localhost:8888/edit-todos/" + id, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ newValue: currentInput }),
    });
  };
  const editTaskHandler = (event) => {
    setCurrentInput(event.target.value);
  };

  return (
    <>
      <i className="icon fa fa-bars icon"></i>
      {!isEditing && (
        <>
          <span>{currentInput}</span>{" "}
          <i className="edit fa fa-edit" onClick={startEditMode}></i>
        </>
      )}

      {isEditing && (
        <>
          <input
            type="text"
            value={currentInput}
            onChange={(event) => {
              editTaskHandler(event);
            }}
          />
          <input type="button" value="OK" onClick={endEditMode} />
        </>
      )}

      <i
        className="trash fa fa-trash"
        onClick={() => ctx.deleteTaskHandler(id)}
      ></i>
    </>
  );
}

export default Task;

// import { useState } from "react";
// function Task({ task, id, getDeleteId }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentInput, setCurrentInput] = useState(task);

//   const startEditMode = () => {
//     setIsEditing(true);
//   };

//   const endEditMode = async () => {
//     setIsEditing(false);

//     await fetch("http://localhost:8888/edit-todos/" + id, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       method: "POST",
//       body: JSON.stringify({ newValue: currentInput }),
//     });
//   };

//   const editTaskHandler = (event) => {
//     setCurrentInput(event.target.value);
//   };

//   const onClickDeleteIcon = async (id) => {
//     const url = `http://localhost:8888/delete-todos/${id}`;

//     const res = await fetch(url, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       method: "POST",
//     });
//     getDeleteId(id);
//   };
//   return (
//     <>
//       <i className="icon fa fa-bars icon"></i>
//       {!isEditing && <span>{currentInput}</span>}

//       {!isEditing && (
//         <i className="edit fa fa-edit" onClick={startEditMode}></i>
//       )}
//       {isEditing && (
//         <input
//           type="text"
//           value={currentInput}
//           onChange={(event) => {
//             editTaskHandler(event);
//           }}
//         />
//       )}
//       {isEditing && <input type="button" value="OK" onClick={endEditMode} />}
//       <i
//         className="trash fa fa-trash"
//         onClick={() => onClickDeleteIcon(id)}
//       ></i>
//     </>
//   );
// }

// export default Task;
