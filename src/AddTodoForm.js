import React from "react";
import InputWithLabel from "./InputWithLabel";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "SET_INPUT":
      return {
        ...state,
        todoTitle: action.payload,
      };
    case "RESET_INPUT":
      return {
        ...state,
        todoTitle: action.payload,
        inputKey: state.inputKey + 1,
      };
    default:
      throw new Error();
  }
};

const AddTodoForm = ({ onAddTodo }) => {

  const [state, dispatch] = React.useReducer(inputReducer, {
    todoTitle: "",
    inputKey: 0,
  });

  const handleTitleChange = (event) => {
    const form = event.currentTarget;
    if (form) {
      let newTodoTitle = form.value;
      dispatch({
        type: "SET_INPUT",
        payload: newTodoTitle,
      });
    }
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form) {
      onAddTodo({ title: state.todoTitle, id: Date.now() });
      dispatch({
        type: "RESET_INPUT",
        payload: "",
      });
    }
  };

  return (
    <form id="add-todo-form" onSubmit={handleAddTodo}>
      <InputWithLabel
        value={state.todoTitle}
        id="todoTitle"
        name="title"
        isFocused
        onInputChange={handleTitleChange}
        key={state.inputKey}
      >
        <strong>Title:</strong>
      </InputWithLabel>
      <button type="submit"> Add </button>
    </form>
  );
};

export default AddTodoForm;
