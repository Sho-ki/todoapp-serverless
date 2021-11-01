import { useState, useContext } from 'react';
import TodoContext from '../store/todo-context';

const Submit = () => {
  const ctx = useContext(TodoContext);

  return (
    <>
      {!ctx.isLoading && (
        <div className='formArea'>
          <input
            type='text'
            name='todo'
            onChange={ctx.inputValueHandler}
            value={ctx.currentInput}
            className={`${!ctx.isValid && 'invalid'}`}
          />

          <button
            type='submit'
            id='submit'
            className='submitBtn'
            disabled={ctx.isLoading || !ctx.isValid}
            onClick={() => {
              ctx.submit();
            }}
          >
            SUBMIT
          </button>
        </div>
      )}
    </>
  );
};

export default Submit;
