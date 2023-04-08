import React from 'react';




const AddTodoForm = (props) => {

  const [todoTitle , setTodoTitle  ] = React.useState('');


  const handleTitleChange = (event) => {
    const form = event.currentTarget;
    if (form) {
     let newTodoTitle = form.value;
     setTodoTitle(newTodoTitle);
    }
 

  };


  const handleAddTodo = (event) => {

    event.preventDefault();
    const form = event.currentTarget;
    if (form) {   
      console.log(todoTitle);
      props.onAddTodo(todoTitle);
      document.getElementById("add-todo-form").reset();
    }
  };

  return (
    <form id="add-todo-form" onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title: </label>
      <input name="title" id="todoTitle" value={todoTitle} onChange={handleTitleChange} style={{ marginRight: "4px" }}></input>
      <button type="submit"> Add </button>
    </form>
  );
};

export default AddTodoForm;
