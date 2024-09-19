import "./Input.css";

const Input = ({ type, placeholder, className, data, setData, max }) => {
  return (
    <input
      max={max}
      type={type}
      placeholder={placeholder}
      className={className}
      value={data}
      onChange={(e) => {
        if (type !== "file") {
          setData(e.target.value);
        } else {
          setData(e.target.files[0]);
        }
      }}
    />
  );
};

export default Input;
