import { forwardRef } from "react";
const Input = forwardRef(
  ({ label, placeholder, id, name, onBlur, htmlFor }, ref) => {
    return (
      <div className="flex-column">
        <label className="text-blue" htmlFor={htmlFor}>
          {label}
        </label>
        <input
          type="text"
          name={name}
          ref={ref}
          onBlur={onBlur}
          id={id}
          placeholder={placeholder}
        ></input>
      </div>
    );
  }
);

export default Input;
