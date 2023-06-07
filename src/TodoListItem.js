import React from "react";
import style from "./TodoListItem.module.css";
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const TodoListItem = ({ todoListItem, onRemoveTodo }) => {
  return (
    <li className={style.ListItem}>
      <span className={style.IconContainer}>
        <FaCheckCircle className={style.CheckIcon} />
      </span>
      <span className={style.TitleStyle}>{todoListItem.title}</span>
      <button type="button" className={style.ButtonStyle} onClick={() => onRemoveTodo(todoListItem.id)}>
        <FaTimesCircle className={style.DeleteIcon} />
        <span className={style.DeleteText}>Remove</span>
      </button>
    </li>
  );
}

export default TodoListItem;
