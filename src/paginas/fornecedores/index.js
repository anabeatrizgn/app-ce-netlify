import "./styles.css";
import { useStyles } from "../../estilos/backdrop";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ReactComponent as ProcurarDemanda } from "../../assets/contalupa.svg";
import { UseFetch } from "../../contexto/regra-negocio";
import Logo from "../../componentes/logo";
import Card from "../../componentes/card-fornecedores";
import BotaoPrimario from "../../componentes/botao";
import Input from "../../componentes/input";

export default function Fornecedores() {
  const { handleFornecedores, fornecedores, lista, carregando } = UseFetch();
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (errors.demanda_kwh?.type === "required") {
      toast.error("Campo obrigatório");
    }
  }, [errors.demanda_kwh]);

  return (
    <div>
      <header className="logo-resp">
        <Logo />
      </header>
      <div className="container-form flex-column">
        <form
          className="flex-row busca"
          onSubmit={handleSubmit(handleFornecedores)}
        >
          <div className="flex-column">
            <Input
              label="Valor de demanda em KWH"
              name="demanda_kwh"
              id="demanda_kwh"
              htmlFor="demanda_kwh"
              placeholder="Digite seu valor de demanda"
              {...register("demanda_kwh", { required: true })}
            />
            <BotaoPrimario>Buscar Fornecedores</BotaoPrimario>
          </div>
          <div className={lista ? `imagem-busca imagem-resp` : `imagem-busca`}>
            <ProcurarDemanda />
          </div>
        </form>
        {lista && (
          <div className="card">
            {Array.isArray(fornecedores)
              ? fornecedores.map((fornecedor) => (
                  <Card
                    nome={fornecedor.nome}
                    logo={fornecedor.logo}
                    estado={fornecedor.estado}
                    custo={fornecedor.custo_kwh}
                    clientes={fornecedor.qtd_clientes}
                    avaliacao={fornecedor.avaliacao_media}
                  />
                ))
              : fornecedores}
          </div>
        )}
      </div>
      <Backdrop className={classes.backdrop} open={carregando}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
