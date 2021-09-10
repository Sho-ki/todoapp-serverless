import { useEffect, useState } from "react";

function useTask(httpContent) {
  const [enteredTodo, setEnteredTodo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const sendRequest = async () => {
      try {
        await fetch(httpContent.url, {
          headers: httpContent.headers ? httpContent.headers : {},
          method: httpContent.method ? httpContent.method : "GET",
          body: httpContent.body ? JSON.stringify(httpContent.body) : null,
        })
          .then(async (res) => {
            return res.json();
          })
          .then((data) => {
            setIsLoading(false);
            setEnteredTodo(data.data);
          });
      } catch (e) {
        console.log(e);
      }
    };
    sendRequest();
  }, []);

  return { enteredTodo, isLoading };
}

export default useTask;
