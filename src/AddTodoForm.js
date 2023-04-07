import React from "react";

const AddTodoForm = (props) => {
  const handleAddTodo = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form) {
      let todoTitle = form.elements.title.value;
      console.log(todoTitle);
      props.onAddTodo(todoTitle);
      document.getElementById("add-todo-form").reset();
    }
  };

  return (
    <form id="add-todo-form" onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title: </label>
      <input name="title" id="todoTitle" style={{ marginRight: "4px" }}></input>
      <button type="submit"> Add </button>
    </form>
  );
};

export default AddTodoForm;
