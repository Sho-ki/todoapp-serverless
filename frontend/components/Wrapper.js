import Task from "./Task";
import useTask from "../hook/useTask";

function Wrapper(todoData) {
  return (
    <>
      <div className="wrapper" id="wrapper">
        {todoData.todoData.map((todo) => (
          <Task task={todo.todo} id={todo.id} key={todo.id}></Task>
        ))}
      </div>
    </>
  );
}

export default Wrapper;
