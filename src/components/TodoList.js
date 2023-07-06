import React from "react";
import TodoListItem  from "./TodoListItem";
import PropTypes from "prop-types";


const generateUniqueKey = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};


const RenderList = ({ todoList, onRemoveTodo }) => {
  return todoList.map((todoListItem) => {
    const key = generateUniqueKey(); 
    return (
    
        <TodoListItem key= {key}
          todoListItem={todoListItem}
          onRemoveTodo={onRemoveTodo}
        />
   
    );
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
      id: PropTypes.string,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};


TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoList;
