import React from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import axios from "axios";
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import style from "./TodoListItem.module.css";


const todoListReducer = (state, action) => {
  switch (action.type) {
    case "TODOLIST_FETCH_INIT":
      return {
        ...state,
        isLoading: true,
      };

    case "CHANGE_SORT_ORDER":
      return {
        ...state,
        sortOrder: action.payload,
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
    sortOrder: "asc"
  });

  const loadTodos = async () => {
    const options = {
      method: "GET",
      url: `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}?sort[0][field]=title&sort[0][direction]=${state.sortOrder}`,
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
    };

    try {
      const response = await axios.get(options.url, {
        headers: options.headers,
      });

      if (response.status !== 200) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const todos = response.data.records
        .map((todo) => {
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
        method: "POST",
        url: `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
        data: airtableData,
      };

      const response = await axios(options);

      if (response.status !== 200) {
        const message = `Error has ocurred:
                               ${response.status}`;
        throw new Error(message);
      }

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
  }, [state.sortOrder]);

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
      .catch(() => dispatch({ type: "TODOLIST_FETCH_FAILURE" }));
  };

  const removeTodo = (id) => {
    dispatch({
      type: "REMOVE_TODOLIST",
      payload: id,
    });
  };


  const toggleSortOrder = () => {
    const newSortOrder = state.sortOrder === "asc" ? "desc" : "asc";
    dispatch({ type: "CHANGE_SORT_ORDER", payload: newSortOrder });
  };

  return (
    <>
      <AddTodoForm onAddTodo={addTodo} />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <button onClick={toggleSortOrder} className={style.Togglebutton}>
      {state.sortOrder === 'asc' ? (
        <>
          <FaSortUp className="icon" />
          Ascending
        </>
      ) : (
        <>
          <FaSortDown className="icon" />
          Descending
        </>
      )}
    </button>
    </div>

      {state.isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList todoList={state.todoList} onRemoveTodo={removeTodo} />
      )}
    </>
  );
}

export default App;
