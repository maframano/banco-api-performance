import http from 'k6/http';
import { sleep, check } from 'k6';
import { obterToken } from '../helpers/autenticacao.js';

export const options = {
  /*vus: 10,
  duration: '30s',*/
  iterations: 1
};

export default function() {
  const token = obterToken()

  /*const url = 'http://localhost:3000/transferencias';
  colocado em variavel em linha de comando com o codigo 
  k6 run tests/transferencias.test.js -e BASE_URL=http://localhost:3000 */
  const url = __ENV.BASE_URL + '/transferencias';

  const payload = JSON.stringify({
    contaOrigem: 1,
    contaDestino: 2,
    valor: 11,
    token: ""

  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
  };

  

  let res =http.post(url, payload, params);
  check(res, {
    "status is 201":(res) => res.status ===201
  });

 // expect.soft(res.status).toBe(201);
  sleep(1);
}

/* 
 const resposta = http.post(url, payload, params);
check(resposta, {
    'Validar que o status é 200': (res) => res.status ===200,
    'Validar que o token é string': (res) => typeof(res.json().token) == 'string'

  }) */