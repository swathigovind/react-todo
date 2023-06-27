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
        sortOrder: action.sortOrder,
        sortField: action.sortField,
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
    sortOrder: "asc",
    sortField: "title",
  });

  const loadTodos = async () => {
    const options = {
      method: "GET",
      url: `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}?sort[0][field]=${state.sortField}&sort[0][direction]=${state.sortOrder}`,
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
            createdOn: todo.fields.createdOn         
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
          createdOn: new Date().toISOString().split("T")[0],
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
  }, [state.sortOrder,state.sortField]);

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


  const toggleSortOrderByTitle = () => {
    const sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
    const sortField = "title"; 
    dispatch({ type: "CHANGE_SORT_ORDER",  sortOrder, sortField });
  };

  const toggleSortOrderByDate = () => {
    const sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
    const sortField = "createdOn"; 
    dispatch({ type: "CHANGE_SORT_ORDER", sortOrder, sortField });
  };

  return (
    <>
       <div style={{ marginBottom: "10px" }}><AddTodoForm onAddTodo={addTodo}  /></div>
      <div style={{ display: "flex", justifyContent: "flex-end"}}>
      <button onClick={toggleSortOrderByTitle} style={{ marginRight: "10px" }} className={style.Togglebutton}>
      {state.sortOrder === 'asc' ? (
        <>
          <FaSortUp className="icon" />
          Sort By Title
        </>
      ) : (
        <>
          <FaSortDown className="icon" />
          Sort By Title
        </>
      )}
    </button>

    <button onClick={toggleSortOrderByDate} style={{ marginRight: "10px" }} className={style.Togglebutton}>
      {state.sortOrder === 'asc' ? (
        <>
          <FaSortUp className="icon" />
          Sort By Date
        </>
      ) : (
        <>
          <FaSortDown className="icon" />
          Sort By Date
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
