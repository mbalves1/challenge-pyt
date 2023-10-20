export const getCepApi = async (cep) => {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error(response.status);
  }
}