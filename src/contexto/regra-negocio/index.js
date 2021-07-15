import { useState, createContext } from "react";
import { UseAuth } from "../../contexto/autorizacao";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";

const FetchContext = createContext();

export function FetchProvider({ children }) {
  const history = useHistory();
  const [carregando, setCarregando] = useState();
  const { setGravarUsuario, setUsuario, token } = UseAuth();
  const [lembrarUsuario, setLembrarUsuario] = useState(false);
  const [fornecedores, setFornecedores] = useState([]);
  const [lista, setLista] = useState(false);

  async function handleLogin(data) {
    setCarregando(true);
    const body = JSON.stringify(data);

    try {
      const response = await fetch("http://localhost:3300/login", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body,
      });

      const login = await response.json();

      if (response.status !== 200) {
        toast.error(login);
      } else {
        setUsuario(login);
        if (lembrarUsuario) {
          setGravarUsuario(login);
        }
        toast.success(`Olá, ${login.usuario.nome}`, {
          onClose: () => {
            history.push("/");
          },
        });
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setCarregando(false);
    }
  }

  async function handleCadastro(data) {
    if (data.senha !== data.confirmar_senha) {
      toast.error("As senhas devem ser iguais");
      return;
    }

    setCarregando(true);
    const { confirmar_senha, ...dataRequerida } = data;
    const body = JSON.stringify(dataRequerida);

    try {
      const response = await fetch("http://localhost:3300/cadastro", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body,
      });

      const cadastro = await response.json();

      if (response.status !== 200) {
        toast.error(cadastro);
      } else {
        toast.success(cadastro, {
          onClose: () => {
            history.push("/login");
          },
        });
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setCarregando(false);
    }
  }

  async function handleFornecedores(data) {
    setCarregando(true);
    const valorDemanda = data.demanda_kwh;

    try {
      const response = await fetch(
        `http://localhost:3300/?demanda_kwh=${valorDemanda}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      const demanda = await response.json();

      if (response.status !== 200) {
        toast.error(demanda);
      } else {
        setFornecedores(demanda);
        history.push(`/?demanda_kwh=${valorDemanda}`);
        setLista(true);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <FetchContext.Provider
      value={{
        handleLogin,
        handleCadastro,
        handleFornecedores,
        carregando,
        lembrarUsuario,
        setLembrarUsuario,
        fornecedores,
        lista,
        setLista,
      }}
    >
      {children}
    </FetchContext.Provider>
  );
}

export function UseFetch() {
  const {
    handleLogin,
    handleCadastro,
    handleFornecedores,
    carregando,
    lembrarUsuario,
    setLembrarUsuario,
    fornecedores,
    lista,
    setLista,
  } = useContext(FetchContext);

  return {
    handleLogin,
    handleCadastro,
    handleFornecedores,
    carregando,
    lembrarUsuario,
    setLembrarUsuario,
    fornecedores,
    lista,
    setLista,
  };
}
