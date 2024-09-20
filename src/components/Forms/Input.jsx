import { FiPlus } from "react-icons/fi";

import "./Input.css";

const Input = ({ type, placeholder, className, data, setData, max }) => {
  if (type === "file") {
    return (
      <label className={className}>
        <input
          type={type}
          onChange={(e) => {
            setData(e.target.files[0]);
          }}
        />
        <FiPlus />
      </label>
    );
  } else
    return (
      <input
        max={max}
        type={type}
        placeholder={placeholder}
        className={className}
        value={data}
        onChange={(e) => {
          setData(e.target.value);
        }}
      />
    );
};

export default Input;
