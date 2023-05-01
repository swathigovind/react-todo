import React from "react";
import TodoListItem  from "./TodoListItem";




const RenderList = ({todoList, onRemoveTodo}) => {
  return todoList.map((todoListItem) => {
    return (<TodoListItem key= {todoListItem.id} todoListItem={todoListItem} onRemoveTodo = {onRemoveTodo }/>);
  });
};

const TodoList = ( { todoList, onRemoveTodo } ) => {

 
  return (
    <ul>
      <RenderList todoList={todoList} onRemoveTodo = {onRemoveTodo } />
    </ul>
  );
};

export default TodoList;
