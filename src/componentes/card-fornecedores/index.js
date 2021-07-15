import "./styles.css";

export default function Card({
  nome,
  logo,
  estado,
  custo,
  clientes,
  avaliacao,
}) {
  function solicitar() {
    alert(
      "Oba! Um E-mail foi enviado aos nossos consultores, agora é só ficar de olho na sua caixa de entrada"
    );
  }

  return (
    <div className="card-fornecedores resp-column">
      <div className="flex-row resp-content">
        <div
          className="logo-fornecedores"
          style={{
            backgroundImage: `url(${logo})`,
          }}
        ></div>
        <h2>{nome}</h2>
        <button className="bt-secundario bt-resp" onClick={() => solicitar()}>
          Solicitar Orçamento
        </button>
      </div>
      <div className="flex-row infos-fornecedores">
        <spam className="flex-column content-center ">
          <p>UF:</p> {estado}
        </spam>
        <spam className="flex-column content-center">
          <p>Custo em R$ por KWH:</p> {custo}
        </spam>
        <spam className="flex-column content-center resp-disp">
          <p>Número de clientes:</p> {clientes}
        </spam>
        <spam className="flex-column content-center">
          <p>Avaliação média: </p>
          {avaliacao}
        </spam>
      </div>
    </div>
  );
}
