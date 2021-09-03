function DeleteBtn({ id, getDeleteId }) {
  const onClickDeleteIcon = async (id) => {
    const url = `http://localhost:8888/delete-todos/${id}`;

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    getDeleteId(id);
  };
  return (
    <i className="trash fa fa-trash" onClick={() => onClickDeleteIcon(id)}></i>
  );
}

export default DeleteBtn;
