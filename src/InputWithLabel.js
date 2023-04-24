import React from "react";

const InputWithLabel = ({ id, label, name, value, onInputChange }) => {
  return (
    <>
      <label htmlFor={id}>{label}: </label>
      <input
        name={name}
        id={id}
        value={value}
        onChange={onInputChange}
        style={{ marginRight: "4px" }}
      ></input>
    </>
  );
};

export default InputWithLabel;
