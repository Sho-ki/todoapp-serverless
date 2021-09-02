function Form() {
  const registerTodo = async (event) => {
    event.preventDefault();

    const res = await fetch("http://localhost:8080/add-todos", {
      body: JSON.stringify({
        name: event.target.todo.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await res.json();

    // result.user => 'Ada Lovelace'
  };

  return (
    <form onSubmit={registerTodo}>
      <input type="text" name="todo" />
      <button type="submit" id="submit" className="submitBtn">
        SUBMIT
      </button>
    </form>
  );
}
