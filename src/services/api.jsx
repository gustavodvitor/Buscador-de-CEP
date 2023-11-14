import axios from "axios";

//O que vai ser alterado na api é só o CEP digitado
//37500007/json/

//aqui é adicionado a base que não é alterada na API
const api = axios.create({
    baseURL:"https://viacep.com.br/ws/"
})

export default api;