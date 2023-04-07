import React from "react";
import TodoListItem  from "./TodoListItem";




const RenderList = (props) => {
  return props.todoList.map((todoListItem) => {
    return (<TodoListItem key= {todoListItem.id} todoListItem={todoListItem}/>);
  });
};

const TodoList = (props) => {
  return (
    <ul>
      <RenderList todoList={props.todoList} />
    </ul>
  );
};

export default TodoList;
