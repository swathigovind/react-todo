import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import { FaPlus } from 'react-icons/fa';
import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";


const AddTodoForm = ({ onAddTodo }) => {
  const [state, setState] = useState({
    todoTitle: "",
    inputKey: 0,
    isAdding: false,
    isFormVisible: false, // Track the form visibility
  });

  const [dueDate, setDueDate] = useState('');

  const handleDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleTitleChange = (event) => {
    const form = event.currentTarget;
    if (form) {
      let newTodoTitle = form.value;
      setState((prevState) => ({
        ...prevState,
        todoTitle: newTodoTitle,
      }));
    }
  };

  const handleAddTodo = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form && form.checkValidity()) {
      setState((prevState) => ({
        ...prevState,
        isAdding: true,
      }));

      await new Promise((resolve) => setTimeout(resolve, 1000));

      onAddTodo({
        title: state.todoTitle,
        status: 'Open',
        id: Date.now(),
        dueDate: dueDate,
      });

      setState((prevState) => ({
        ...prevState,
        todoTitle: "",
        inputKey: prevState.inputKey + 1,
        isAdding: false,
      }));
    } else {  
      form.reportValidity();
    }
  };



  return (
<div className={`${style.FormContainer}`}>
  <form id="add-todo-form" onSubmit={handleAddTodo} className={style.Form}>
    <div className={style.InputContainer}>
      <InputWithLabel
        value={state.todoTitle}
        id="todoTitle"
        name="title"
        isFocused
        onInputChange={handleTitleChange}
        key={state.inputKey}
      >
        <strong>*Title:</strong>
      </InputWithLabel>
    </div>

    <div className={style.InputContainer}>
      <label htmlFor="dueDate">
        <strong>Due Date:</strong>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={handleDateChange}
        />
      </label>
    </div>

    <button type="submit"  className={`${style.Button}`}>
      <FaPlus className={style.AddIcon} /> Add
    </button>
  </form>
</div>

  );
};

AddTodoForm.propTypes = {
  onAddTodo : PropTypes.func.isRequired,
}


export default AddTodoForm;
