import React from "react";
import PropTypes from "prop-types";
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


InputWithLabel.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  isFocused: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  key: PropTypes.string.isRequired
};

export default InputWithLabel;
