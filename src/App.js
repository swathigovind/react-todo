import React from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import axios from 'axios';

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

  // const getToDoList = () =>
  //   new Promise((resolve, reject) =>
  //     setTimeout(
  //       () =>
  //         resolve({
  //           data: {
  //             todoList: JSON.parse(localStorage.getItem("savedTodoList")) || [
  //               { title: "React", id: Date.now() },
  //             ],
  //           },
  //         }),
  //       2000
  //     )
  //   );

  const loadTodos = async () => {
    const options = {
      method: "GET",
      url: `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`,
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
    };

    try {
      const response = await  axios.get(options.url, {
        headers: options.headers,
      });

      if (response.status !== 200) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      //const todosFromAPI = await response.json();

      const todos = response.data.records.map((todo) => {
        const newTodo = {
          id: todo.id,
          title: todo.fields.title,
        };

        return newTodo;
      });

      return todos;
    } catch (error) {
      console.log(error.message);
    }
  };

  const postTodo = async (todo) => {
    try {
      const airtableData = {
        fields: {
          title: todo.title,
        },
      };

      const options = {
        method: 'POST',
        url: `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
        data: airtableData, // Include the data in the request body
      };
  
      const response = await axios( options);

      // const response = await fetch(
      //   options.url,
      //   {
      //     method: options.method,
      //     headers: options.headers,
      //     body: JSON.stringify(airtableData),
      //   }
      // );
  
      if (response.status !== 200) {
        const message = `Error has ocurred:
                               ${response.status}`;
        throw new Error(message);
      }
  
      //const dataResponse = await response.json();
      // let todoList = [];
      // response.data.records.map((t) => {
      //   let todoItem = { 'id': t.id, 'title': t.fields.title };
      //   todoList.push(todoItem);
      // })
      
      return response.data.fields;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  React.useEffect(() => {
    dispatch({ type: "TODOLIST_FETCH_INIT" });

    loadTodos()
      .then((result) => {
        dispatch({
          type: "TODOLIST_FETCH_SUCCESS",
          payload: result,
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
    postTodo(newTodo)
    .then((result) => {
      dispatch({
        type: "TODOLIST_FETCH_SUCCESS",
        payload: [...state.todoList, result],
      });
    })
    .catch(() => dispatch({ type: "TODOLIST_FETCH_FAILURE" }))
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
