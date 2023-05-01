import React from 'react';
import InputWithLabel from './InputWithLabel';




const AddTodoForm = ({onAddTodo}) => {

  const [todoTitle , setTodoTitle  ] = React.useState('');
  const [inputKey, setInputKey] = React.useState(0);

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
      onAddTodo({title: todoTitle, id:Date.now()});
      setTodoTitle('');
      setInputKey((prevKey) => prevKey + 1); 
    }
  };

  return (
    <form id="add-todo-form" onSubmit={handleAddTodo}>
      <InputWithLabel value={todoTitle} id="todoTitle" name="title"  isFocused onInputChange={handleTitleChange} key={inputKey} >    
      <strong>Title:</strong> 
      </InputWithLabel>    
      <button type="submit"> Add </button>
    </form>
  );
};

export default AddTodoForm;
