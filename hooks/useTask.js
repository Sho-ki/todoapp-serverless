import { useState, useContext } from "react";
import { useEffectOnce } from "react-use";
import axios from "axios";
import { arrayMove } from "@dnd-kit/sortable";

function useTask(editTask, editId) {
  const [tasks, setTasks] = useState();

  const [currentInput, setCurrentInput] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffectOnce(() => {
    axios
      .get("/api/list-todos")
      .then((res) => {
        setTasks(res.data.data);
        setIsLoading(false);
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
          return;
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
          return;
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

  const inputValueHandler = (e) => {
    if (e.target.value.trim().length > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    setCurrentInput(e.target.value);
  };

  const submit = () => {
    addTaskHandler(currentInput);
    setIsLoading(false);
    setCurrentInput("");
    setIsValid(false);
  };
  //
  const [isEditing, setIsEditing] = useState(false);
  const [editCurrentInput, setEditCurrentInput] = useState(editTask);
  const [isEditValid, setIsEditValid] = useState(true);
  const [isEditLoading, setIsEditLoading] = useState(false);

  const startEditMode = () => {
    setIsEditing(true);
  };

  const endEditMode = () => {
    if (editCurrentInput.trim().length === 0) {
      setIsEditValid(false);
      return;
    }
    editTaskHandler(editId, editCurrentInput);
    setIsEditing(false);
    setIsEditValid(true);
    setIsEditLoading(false);
  };

  const onEditChange = (e) => {
    if (e.target.value.trim().length > 0) {
      setIsEditValid(true);
      setIsEditLoading(false);
    } else {
      setIsEditLoading(true);
    }
    setEditCurrentInput(e.target.value);
  };

  return {
    tasks,
    addTaskHandler,
    editTaskHandler,
    deleteTaskHandler,
    handleDragEnd,
    currentInput,
    inputValueHandler,
    isValid,
    isLoading,
    submit,
    //
    editCurrentInput,
    startEditMode,
    endEditMode,
    onEditChange,
    isEditing,
    isEditValid,
    isEditLoading,
  };
}

export default useTask;
