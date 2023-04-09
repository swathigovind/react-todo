import React from "react";
import TodoListItem  from "./TodoListItem";




const RenderList = ({todoList}) => {
  return todoList.map((todoListItem) => {
    return (<TodoListItem key= {todoListItem.id} todoListItem={todoListItem}/>);
  });
};

const TodoList = ( { todoList } ) => {

 
  return (
    <ul>
      <RenderList todoList={todoList} />
    </ul>
  );
};

export default TodoList;
