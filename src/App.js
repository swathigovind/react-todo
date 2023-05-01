import React from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";


function App() {

  const [todoList, setTodoList] = React.useState(
    JSON.parse(localStorage.getItem("savedTodoList")) || [
      { title: "React", id: Date.now() },
    ]
  );

  React.useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList]);


  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  const removeTodo = (id) => {
    const newToDoList = todoList.filter(
      (item) => id !== item.id
    );
    setTodoList (newToDoList);
  };
  

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
    </>
  );
}

export default App;
