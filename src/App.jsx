import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./style.css";
import api from "./services/api";
function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  //Como pode demorar um pouco para requisitar da API, trransforma
  //em uma função assincrona
  async function handleSearch() {
    //37500007/json/
    if (input === "") {
      alert("Preencha algum CEP!");
      return;
    }

    try {
      //await faz com que espere a requisição
      //O CEP digitado foi passado para o input e vai ser acessado pelo api.get
      // /json é o formato que voce quer trazer
      //api.get(). Isso significa que a execução do código será pausada até que a resposta da requisição seja recebida.
      //input é uma variável que contém o valor do CEP fornecido pelo usuário.
      const response = await api.get(`${input}/json`);
      //O console retorna um objeto com varias props, e a que possui as informações é a prop data

      //setCep é uma state que atualiza o estado da variavel
      //response é a resposta da requisição HTTP feita anteriormente
      //response.data é a parte dos dados da resposta que contém os detalhes relacionados ao CEP.
      setCep(response.data);
      //Atualiza o estado para vazio após ser utilizado
      setInput("");
    } catch {
      alert("Ops, erro ao buscar");
      //após p alert, limpa o campo de pesquisa
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">BUSCADOR DE CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu CEP..."
          //value é uma propriedade usada para definir o valor atual do componente de entrada. No contexto de um campo de texto, como um <input>, value determina o valor exibido no campo.
          value={input}
          //onChange = propriedade usada para definir uma função de retorno de chamada que será executada quando o valor do componente de entrada for alterado pelo usuário.

          onChange={(e) => setInput(e.target.value)} //(e) => setInput(e.target.value) é a função de retorno de chamada. Isso é uma função anônima que recebe um evento (geralmente chamado de e) como argumento.
          //e.target.value é a parte do evento que contém o valor atual do componente de entrada quando o evento ocorreu. Em um campo de texto, isso representa o texto atualmente digitado no campo.
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2> CEP:{cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>{cep.complement}</span>
          <span>{cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;
