import { useState } from "react";
function Task({ task, id }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentInput, setCurrentInput] = useState(task);

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
      {!isEditing && <span>{currentInput}</span>}

      {!isEditing && (
        <i className="edit fa fa-edit" onClick={startEditMode}></i>
      )}
      {isEditing && (
        <input
          type="text"
          value={currentInput}
          onChange={(event) => {
            editTaskHandler(event);
          }}
        />
      )}
      {isEditing && <input type="button" value="OK" onClick={endEditMode} />}
    </>
  );
}

export default Task;
