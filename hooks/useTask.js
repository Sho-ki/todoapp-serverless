import { useState } from "react";
import { useEffectOnce } from "react-use";
import axios from "axios";
import { arrayMove } from "@dnd-kit/sortable";

function useTask() {
  const [tasks, setTasks] = useState();

  useEffectOnce(() => {
    axios
      .get("/api/list-todos")
      .then((res) => {
        setTasks(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  });

  const addTaskHandler = async (task) => {
    await axios
      .post("/api/add-todos", {
        todo: task,
      })
      .catch((e) => {
        console.log(e);
      });

    await axios
      .get("/api/list-todos")
      .then((res) => {
        setTasks(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const editTaskHandler = async (id, currentInput) => {
    await axios
      .post("/api/edit-todos/" + id, {
        newValue: currentInput,
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteTaskHandler = async (id) => {
    await axios.post("/api/delete-todos/" + id);

    setTasks(tasks.filter((todo) => todo.id !== id));
  };

  const handleDragEnd = async ({ active, over }) => {
    let newIdx;
    let movedArray;
    if (over && active.id !== over.id) {
      setTasks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        movedArray = arrayMove(items, oldIndex, newIndex);
        newIdx = newIndex;
        return arrayMove(items, oldIndex, newIndex);
      });
      orderChangeRequest(active.id, newIdx, movedArray);
    }
  };

  async function orderChangeRequest(id, newIdx, movedArray) {
    let prevElIndexNumber;
    let nextElIndexNumber;
    if (movedArray[newIdx - 1] !== undefined) {
      const prevId = movedArray[newIdx - 1].id;
      await axios
        .get("/api/read-todos/" + prevId)
        .then((data) => {
          prevElIndexNumber = data.data.data[0].index_number;
        })
        .catch((e) => {
          console.log(e);
        });
    }
    if (movedArray[newIdx + 1] !== undefined) {
      const nextId = movedArray[newIdx + 1].id;
      await axios
        .get("/api/read-todos/" + nextId)
        .then((data) => {
          nextElIndexNumber = data.data.data[0].index_number;
        })
        .catch((e) => {
          console.log(e);
        });
    }
    const orderChange = async () => {
      await axios
        .post("/api/order-todos/" + id, {
          prevElIndexNumber,
          nextElIndexNumber,
        })
        .catch((e) => {
          console.log(e);
        });
    };
    orderChange();
  }

  return [
    tasks,
    addTaskHandler,
    editTaskHandler,
    deleteTaskHandler,
    handleDragEnd,
  ];
}

export default useTask;
