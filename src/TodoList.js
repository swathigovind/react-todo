import React from "react";
import TodoListItem  from "./TodoListItem";


var todoList = [
  {
    id: 1,
    title: "Start Assignment",
  },
  {
    id: 2,
    title: "Assignment In Progress",
  },

  {
    id: 3,
    title: "Complete Assignment",
  },
];

const RenderList = () => {
  return todoList.map((todoListItem) => {
    return (<TodoListItem key= {todoListItem.id} todoListItem={todoListItem}/>);
  });
};

const TodoList = () => {
  return (
    <ul>
      <RenderList />
    </ul>
  );
};

export default TodoList;
