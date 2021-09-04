import Task from "./Task";

function Wrapper({ todoData, deleteTask }) {
  return (
    <>
      {todoData.map((todo) => (
        <div className="wrapper" id="wrapper" key={todo.id}>
          <Task task={todo.todo} id={todo.id} getDeleteId={deleteTask}></Task>
        </div>
      ))}
    </>
  );
}

export default Wrapper;
