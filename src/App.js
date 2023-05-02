import React from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  const todoListReducer = (state, action) => {
    if (action.type === "SET_TODOLIST") {
      return action.payload;
    } else if (action.type === "REMOVE_TODOLIST") {
      return state.filter((item) => action.payload !== item.id);
    } else {
      throw new Error();
    }
  };

  const [todoList, dispatchTodoList] = React.useReducer(todoListReducer, []);

  const getToDoList = () =>
    new Promise((resolve, reject) =>
      setTimeout(
        () =>
          resolve({
            data: {
              todoList: JSON.parse(localStorage.getItem("savedTodoList")) || [
                { title: "React", id: Date.now() },
              ],
            },
          }),
        2000
      )
    );

  React.useEffect(() => {
    getToDoList().then((result) => {
      dispatchTodoList({
        type: "SET_TODOLIST",
        payload: result.data.todoList,
      });

      setIsLoading(false);
    });
  }, [todoList]);

  React.useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const addTodo = (newTodo) => {
    dispatchTodoList({
      type: "SET_TODOLIST",
      payload: [...todoList, newTodo],
    });
  };

  const removeTodo = (id) => {
    dispatchTodoList({
      type: "REMOVE_TODOLIST",
      payload: id,
    });
  };

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading ? (
        <p> Loading...</p>
      ) : (
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
      )}
    </>
  );
}

export default App;
