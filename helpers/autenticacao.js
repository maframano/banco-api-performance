import http from 'k6/http';
import { pegarBaseURL } from '../util/variaveis.js';
const postLogin = JSON.parse(open('../fixtures/postLogin.json'))


export function obterToken() {
    //const url = __ENV.BASE_URL + '/login'; substituido por:
    const url = pegarBaseURL() + '/login';

    const payload = JSON.stringify(postLogin);

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const resposta = http.post(url, payload, params);
    return resposta.json('token')

}

/*para criar um novo arq do k6, usar o comando k6 new tests/transferencias.js
no terminal, lembrando que tests/transferencias.js é o endereço/nomeDoArq que 
quero criar */