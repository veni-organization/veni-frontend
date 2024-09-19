import "./Input.css";

const Input = ({ type, placeholder, className, data, setData }) => {
  return (
    <input
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
