import React from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

const todoListReducer = (state, action) => {
  switch (action.type) {
    
    case "TODOLIST_FETCH_INIT":
      return {
        ...state,
        isLoading: true,
      };

    case "TODOLIST_FETCH_SUCCESS":
      return {
        ...state,
        todoList: action.payload,
        isLoading: false,
      };

    case "TODOLIST_FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case "REMOVE_TODOLIST":
      return {
        ...state,
        todoList: state.todoList.filter((item) => action.payload !== item.id),
        isLoading: false,
      };
    default:
      throw new Error();
  }
};

function App() {
  const [state, dispatch] = React.useReducer(todoListReducer, {
    todoList: [],
    isLoading: true,
    isError: false,
  });

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
    dispatch({ type: "TODOLIST_FETCH_INIT" });

    getToDoList()
      .then((result) => {
        dispatch({
          type: "TODOLIST_FETCH_SUCCESS",
          payload: result.data.todoList,
        });
      })
      .catch(() => dispatch({ type: "TODOLIST_FETCH_FAILURE" }));
  }, []);

  React.useEffect(() => {
    if (!state.isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(state.todoList));
    }
  }, [state.todoList, state.isLoading]);

  const addTodo = (newTodo) => {
    dispatch({
      type: "TODOLIST_FETCH_SUCCESS",
      payload: [...state.todoList, newTodo],
    });
  };

  const removeTodo = (id) => {
    dispatch({
      type: "REMOVE_TODOLIST",
      payload: id,
    });
  };

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {state.isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList todoList={state.todoList} onRemoveTodo={removeTodo} />
      )}
    </>
  );
}

export default App;
