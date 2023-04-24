import React from "react";

const InputWithLabel = ({ id, name, value, onInputChange, children  }) => {
  return (
    <>
      <label htmlFor={id}>{children} </label>
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
