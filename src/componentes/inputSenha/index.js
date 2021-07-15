import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
import { useState, forwardRef } from "react";

const InputSenha = forwardRef(
  ({ label, placeholder, value, setValue, name, onBlur }, ref) => {
    const [verSenha, setVerSenha] = useState(false);

    return (
      <div className="flex-column input-senha">
        <label className="text-blue" htmlFor="password">
          {label}
        </label>
        <input
          type={verSenha ? "text" : "password"}
          name={name}
          ref={ref}
          onBlur={onBlur}
          id="senha"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></input>
        <FontAwesomeIcon
          className="eye-senha"
          onClick={() => setVerSenha(!verSenha)}
          icon={verSenha ? faEye : faEyeSlash}
        />
      </div>
    );
  }
);

export default InputSenha;
