import React from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";




function App() {
  const [todoList, setTodoList] = React.useState([]);

  React.useEffect(() => {
    const fetchData = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            data: {
              todoList: todoList // Use the initial/default list state
            }
          });
        }, 2000);
      });
    };

    fetchData().then(result => {
      setTodoList(result.data.todoList);
    });
  }, [todoList]);

  React.useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  const removeTodo = (id) => {
    const newTodoList = todoList.filter(
      (item) => id !== item.id
    );
    setTodoList(newTodoList);
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
