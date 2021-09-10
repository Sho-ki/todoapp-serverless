import Task from "./Task";
import useTask from "../hook/useTask";

function Wrapper(todoData) {
  return (
    <>
      {todoData.todoData.map((todo) => (
        <div className="wrapper" id="wrapper" key={todo.id}>
          <Task task={todo.todo} id={todo.id}></Task>
        </div>
      ))}
    </>
  );
}

export default Wrapper;
