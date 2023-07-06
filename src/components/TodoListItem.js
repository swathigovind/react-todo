import React, { useState } from "react";
import style from "./TodoListItem.module.css";
import {
  FaCheckCircle,
  FaTimes,
  FaTrash,
  FaEdit,
  FaSave,
  FaChevronDown,
  FaHourglass,
  FaExclamationCircle,
} from "react-icons/fa";
import PropTypes from "prop-types";

const TodoListItem = ({ todoListItem, onRemoveTodo, onUpdateTodo }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [status, setStatus] = useState("Open");

  const handleStatusChange = (event) => {
    todoListItem.status = event.target.value;
    setStatus(event.target.value);
  };

  const handleUpdateClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleCancelClick = () => {
    setIsFlipped(false);
  };

  if (!todoListItem) {
    return null;
  }

  const getStatusClassName = () => {
    if (todoListItem.status === "Done") {
      return style.Done;
    } else if (todoListItem.status === "In Progress") {
      return style.InProgress;
    } else {
      return style.Default;
    }
  };

  return (
    <li>
      {!isFlipped ? (
        <div className={`${style.ListItem} ${getStatusClassName()}`}>
          <span className={style.IconContainer}>
            {todoListItem.status === "Done" ? (
              <FaCheckCircle className={style.CheckIcon} />
            ) : todoListItem.status === "In Progress" ? (
              <FaHourglass className={style.CheckIcon} />
            ) : (
              <FaExclamationCircle className={style.CheckIcon} />
            )}
          </span>
          <span className={style.TitleStyle}>{todoListItem.title}</span>
          <button
            type="button"
            className={style.ButtonStyle}
            onClick={() => onRemoveTodo(todoListItem.id)}
          >
            <FaTrash />
          </button>

          <button
            type="button"
            className={style.ButtonStyle}
            onClick={handleUpdateClick}
          >
            <FaEdit />
          </button>
        </div>
      ) : (
        <div className={`${style.ListItem} ${getStatusClassName()} `}>
          <span className={style.IconContainer}>
            {todoListItem.status === "Done" ? (
              <FaCheckCircle className={style.CheckIcon} />
            ) : todoListItem.status === "In Progress" ? (
              <FaHourglass className={style.CheckIcon} />
            ) : (
              <FaExclamationCircle className={style.CheckIcon} />
            )}
          </span>
          <span className={style.TitleStyle}>{todoListItem.title}</span>
          <div className={style.DropdownContainer}>
            <select value={todoListItem.status} onChange={handleStatusChange}>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <FaChevronDown className={style.DropdownIcon} />
          </div>

          <button
            type="button"
            className={style.ButtonStyle}
            onClick={() => onUpdateTodo(todoListItem)}
          >
            <FaSave />
          </button>

          <button
            type="button"
            className={style.ButtonStyle}
            onClick={handleCancelClick}
          >
            <FaTimes />
          </button>
        </div>
      )}
    </li>
  );
};

TodoListItem.propTypes = {
  todoListItem: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
  }),
  onRemoveTodo: PropTypes.func.isRequired,
  onUpdateTodo: PropTypes.func,
};

export default TodoListItem;
