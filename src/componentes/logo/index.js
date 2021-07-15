import "./styles.css";
import { ReactComponent as LogoCE } from "../../assets/logo.svg";
import { UseAuth } from "../../contexto/autorizacao";
import { Link, useHistory } from "react-router-dom";
import { UseFetch } from "../../contexto/regra-negocio";

export default function Logo() {
  const { gravarUsuario, removeGravarUsuario, token, setUsuario } = UseAuth();
  const { setLista } = UseFetch();
  const history = useHistory();

  function deslogar() {
    setUsuario({});
    setLista(false);

    if (gravarUsuario) {
      removeGravarUsuario();
    }

    history.push("/login");
    return;
  }

  return (
    <div className="logo">
      <LogoCE />
      {token && (
        <div className="links">
          <Link path="/login" onClick={() => deslogar()}>
            Sair
          </Link>
          <a
            target="_blank"
            href="https://clarke.com.br/simulador/"
            rel="noreferrer"
          >
            Simulador
          </a>
          <a
            target="_blank"
            href="https://clarke.com.br/blog/"
            rel="noreferrer"
          >
            Blog
          </a>
        </div>
      )}
    </div>
  );
}
