import useAddInput from "../hooks/useAddInput";

const Submit = () => {
  const [currentInput, inputValueHandler, isValid, isLoading, submit] =
    useAddInput();

  return (
    <>
      <div className="formArea">
        <input
          type="text"
          name="todo"
          onChange={inputValueHandler}
          value={currentInput}
          className={`${!isValid && "invalid"}`}
        />

        <button
          type="submit"
          id="submit"
          className="submitBtn"
          disabled={isLoading || !isValid}
          onClick={() => {
            submit();
          }}
        >
          SUBMIT
        </button>
      </div>
    </>
  );
};

export default Submit;
