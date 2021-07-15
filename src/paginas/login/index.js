import "./styles.css";
import { useStyles } from "../../estilos/backdrop";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ContaLuz } from "../../assets/contaluz.svg";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { UseFetch } from "../../contexto/regra-negocio";
import Logo from "../../componentes/logo";
import InputSenha from "../../componentes/inputSenha";
import Input from "../../componentes/input";
import BotaoPrimario from "../../componentes/botao";

export default function Login() {
  const { handleLogin, setLembrarUsuario, lembrarUsuario, carregando } =
    UseFetch();
  const [senhaLogin, setSenhaLogin] = useState("");
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (
      errors.email?.type === "required" ||
      errors.senha?.type === "required"
    ) {
      toast.error("Digite email e senha");
    }
  }, [errors.email, errors.senha]);

  return (
    <div>
      <Logo />
      <div className="container-form-login">
        <div className="conta-luz">
          <ContaLuz />
        </div>
        <form className="form form-login" onSubmit={handleSubmit(handleLogin)}>
          <div className="text-center mb-lg">
            <h1 className="text-blue">Entrar</h1>
            <Link to="/cadastro">Cadastre-se</Link>
          </div>
          <div>
            <Input
              label="E-mail"
              name="email"
              id="email"
              htmlFor="email"
              placeholder="Digite sua email"
              {...register("email", { required: true })}
            />
            <InputSenha
              label="Senha"
              name="senha"
              placeholder="Digite sua senha"
              value={senhaLogin}
              setValue={setSenhaLogin}
              {...register("senha", { required: true })}
            />
            <BotaoPrimario>Enviar</BotaoPrimario>
            <div className="mt-lg flex-row item-center">
              <input
                type="checkbox"
                value="lembrar-me"
                name="lembrarUsuario"
                checked={lembrarUsuario}
                onChange={() => setLembrarUsuario(!lembrarUsuario)}
              />
              <label className="text-blue" htmlfor="lembrar-me">
                Lembrar-me
              </label>
            </div>
          </div>
        </form>
      </div>
      <Backdrop className={classes.backdrop} open={carregando}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
