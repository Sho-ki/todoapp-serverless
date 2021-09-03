import { useEffect, useState } from "react";
import DeleteBtn from "./DeleteBtn";
import Task from "./Task";

function Wrapper({ todoData, deleteTask }) {
  return (
    <>
      {todoData.map((todo) => (
        <div className="wrapper" id="wrapper" key={todo.id}>
          <Task task={todo.todo} id={todo.id}></Task>

          <DeleteBtn id={todo.id} getDeleteId={deleteTask}></DeleteBtn>
        </div>
      ))}
    </>
  );
}

export default Wrapper;
