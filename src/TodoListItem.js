import React from "react";


const TodoListItem = ({ todoListItem, onRemoveTodo }) => {
  const listItemStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    padding: '10px',
    marginBottom: '5px',
    borderRadius: '5px',
  };

  const titleStyle = {
    flex: 3,
  };

  const buttonStyle = {
    backgroundColor: 'red',
    color: 'white',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    marginLeft: '5px',
  };

  return (
    <li style={listItemStyle}>
      <span style={titleStyle}>{todoListItem.title}</span>
      <button type="button" style={buttonStyle} onClick={() => onRemoveTodo(todoListItem.id)}>Remove</button>
    </li>
  );
}

export default TodoListItem;