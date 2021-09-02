import { useEffect, useState } from "react";

function Wrapper(props) {
  console.log(props.todoList);

  return <div className="wrapper" id="wrapper"></div>;
}

export default Wrapper;
