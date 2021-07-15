import { useState, useContext, createContext } from "react";
import { useLocalStorage } from "react-use";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState({});
  const [gravarUsuario, setGravarUsuario, removeGravarUsuario] =
    useLocalStorage("valorToken", "");
  const [carregando, setCarregando] = useState(false);
  const token = gravarUsuario?.token ?? usuario.token;

  return (
    <AuthContext.Provider
      value={{
        removeGravarUsuario,
        gravarUsuario,
        usuario,
        setUsuario,
        setGravarUsuario,
        carregando,
        setCarregando,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function UseAuth() {
  const {
    removeGravarUsuario,
    gravarUsuario,
    usuario,
    setUsuario,
    setGravarUsuario,
    carregando,
    setCarregando,
    token,
  } = useContext(AuthContext);

  return {
    removeGravarUsuario,
    gravarUsuario,
    usuario,
    setUsuario,
    setGravarUsuario,
    carregando,
    setCarregando,
    token,
  };
}
