export default async function CidadePorCep(cep) {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

    const { localidade, erro } = await response.json();

    if (erro) {
      return false;
    }
    return localidade;
  } catch (error) {
    return false;
  }
}
