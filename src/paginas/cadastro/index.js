import "./styles.css";
import { useStyles } from "../../estilos/backdrop";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { UseFetch } from "../../contexto/regra-negocio";
import CidadePorCep from "../../servicos/viacep";
import InputSenha from "../../componentes/inputSenha";
import Logo from "../../componentes/logo";
import BotaoPrimario from "../../componentes/botao";
import Input from "../../componentes/input";

export default function Cadastro() {
  const { handleCadastro, carregando } = UseFetch();
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [senhaCadastro, setSenhaCadastro] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handlePreencherCidade(meuCep) {
    const cidade = await CidadePorCep(meuCep);

    if (!cidade) {
      toast.error("Falha ao encontrar cidade");
      return;
    }
    setCidade(cidade);
  }

  useEffect(() => {
    if (cep.length < 9 && cidade.length > 0) {
      setCidade("");
    }

    if (cep.indexOf("-") !== -1) {
      if (cep.length === 9) {
        handlePreencherCidade(cep);
      }
      return;
    }

    if (cep.length === 8) {
      handlePreencherCidade(cep);
    }
  }, [cep]);

  useEffect(() => {
    if (
      errors.email?.type === "required" ||
      errors.nome?.type === "required" ||
      errors.cep?.type === "required" ||
      errors.cidade?.type === "required" ||
      errors.senha?.type === "required" ||
      errors.confirmar_senha?.type === "required"
    ) {
      toast.error("Todos os campos são obrigatórios");
    }
  }, [
    errors.email,
    errors.senha,
    errors.nome,
    errors.cep,
    errors.cidade,
    errors.confirmar_senha,
  ]);

  return (
    <div>
      <Logo />
      <div className="container-form">
        <form
          className="form form-cadastro"
          onSubmit={handleSubmit(handleCadastro)}
        >
          <div className="text-center mb-lg">
            <h1 className="text-blue h1resp">Cadastre-se</h1>
            <Link to="/login">Entrar</Link>
          </div>
          <div className="body-cadastro">
            <Input
              label="Nome"
              name="nome"
              id="nome"
              htmlFor="nome"
              placeholder="Digite seu nome"
              {...register("nome", { required: true })}
            />
            <Input
              label="E-mail"
              name="email"
              id="email"
              htmlFor="email"
              placeholder="Digite sua email"
              {...register("email", { required: true })}
            />
          </div>
          <div className="body-cadastro">
            <div className="flex-column">
              <label className="text-blue">CEP</label>
              <input
                placeholder="Digite seu cep"
                type="text"
                {...register("cep", { required: true })}
                value={cep}
                maxLenght={9}
                onChange={(e) => setCep(e.target.value)}
              />
            </div>
            <div className="flex-column">
              <label className="text-blue">Cidade</label>
              <input
                placeholder="Digite seu cidade"
                {...register("cidade", { required: true })}
                type="text"
                value={cidade}
              />
            </div>
          </div>
          <div className="body-cadastro">
            <InputSenha
              label="Senha"
              placeholder="Digite sua senha"
              value={senhaCadastro}
              setValue={setSenhaCadastro}
              {...register("senha", { required: true })}
            />
            <InputSenha
              label="Confirme sua senha"
              placeholder="Digite sua senha novamente"
              value={confirmarSenha}
              setValue={setConfirmarSenha}
              {...register("confirmar_senha", { required: true })}
            />
          </div>
          <div className="flex-row content-center item-center mb-lg">
            <BotaoPrimario>Enviar</BotaoPrimario>
          </div>
        </form>
      </div>
      <Backdrop className={classes.backdrop} open={carregando}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
