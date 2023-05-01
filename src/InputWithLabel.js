import React from "react";

const InputWithLabel = ({
  id,
  name,
  value,
  onInputChange,
  isFocused,
  children,
  key

}) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children} </label>
      <input
        ref={inputRef}
        name={name}
        id={id}
        value={value}
        onChange={onInputChange}
        style={{ marginRight: "4px" }} key={key}
      ></input>
    </>
  );
};

export default InputWithLabel;
