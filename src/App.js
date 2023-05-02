import React from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";




function App() {
  const [todoList, setTodoList] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(true);



  React.useEffect(() => {
    const fetchData = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            data: {
              todoList:  JSON.parse(localStorage.getItem("savedTodoList")) || [
                { title: "React", id: Date.now() },
              ]
            }
          });
        }, 2000);
      });
    };

    fetchData().then(result => {
      setTodoList(result.data.todoList);
      setIsLoading(false);
    });
  }, [todoList]);



  React.useEffect(() => {
    if (!isLoading) {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);



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
       {isLoading ? (<p > Loading...</p>) :
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} /> }
    </>
  );
}


export default App;
