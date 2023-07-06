import React, { useState } from "react";
import TodoListItem from "./TodoListItem";
import PropTypes from "prop-types";

const PAGE_SIZE = 10;

const generateUniqueKey = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

const RenderList = ({ todoList, onRemoveTodo, onUpdateTodo }) => {
  return todoList.map((todoListItem) => {
    const key = generateUniqueKey();
    return (
      <TodoListItem
        key={key}
        todoListItem={todoListItem}
        onRemoveTodo={onRemoveTodo}
        onUpdateTodo={onUpdateTodo}
      />
    );
  });
};

const TodoList = ({ todoList, onRemoveTodo,onUpdateTodo }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const visibleTodoList = todoList.slice(startIndex, endIndex);

  const totalPages = Math.ceil(todoList.length / PAGE_SIZE);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div>
      <ul>
        <RenderList todoList={visibleTodoList} onRemoveTodo={onRemoveTodo} onUpdateTodo={onUpdateTodo} />
      </ul>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            disabled={pageNumber === currentPage}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
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
  onUpdateTodo: PropTypes.func
};

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  onUpdateTodo: PropTypes.func
};

export default TodoList;
