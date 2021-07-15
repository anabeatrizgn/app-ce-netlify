import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./paginas/login";
import Cadastro from "./paginas/cadastro";
import Fornecedores from "./paginas/fornecedores";
import { AuthProvider } from "./contexto/autorizacao";
import { UseAuth } from "./contexto/autorizacao";
import { FetchProvider } from "./contexto/regra-negocio";

function AuthPath(props) {
  const { token } = UseAuth();

  return (
    <Route render={() => (token ? props.children : <Redirect to="/login" />)} />
  );
}

function Rotas() {
  return (
    <Router>
      <AuthProvider>
        <FetchProvider>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/cadastro" component={Cadastro} />
            <AuthPath>
              <Route path="/fornecedores" component={Fornecedores} />
            </AuthPath>
          </Switch>
        </FetchProvider>
      </AuthProvider>
    </Router>
  );
}

export default Rotas;
