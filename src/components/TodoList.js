import React from "react";
import TodoListItem  from "./TodoListItem";
import PropTypes from "prop-types";



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

RenderList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};


TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoList;
