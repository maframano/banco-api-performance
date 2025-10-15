import http from 'k6/http';
import { sleep, check } from 'k6';


export const options = {
  // Define the number of iterations for the test
  iterations: 50,
  //thresholds testa os limites dos percentis
  thresholds: {
    http_req_duration: ['p(90)<4.63', 'max<4'],
    http_req_failed: ['rate<0.01']
  }
}


export default function () {
  const url = 'http://localhost:3000/login';

  const payload = JSON.stringify({
    username: 'julio.lima',
    senha: '123456',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const resposta = http.post(url, payload, params);

  //checks servem para mostrar que a api está funcionando
  check(resposta, {
    'Validar que o status é 200': (res) => res.status ===200,
    'Validar que o token é string': (res) => typeof(res.json().token) == 'string'

  })
 
  sleep(1);
  console.log(resposta)
}

/*Para termos acesso a um grafico dos resultados(dashboard), usar o comando
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run tests/login.test.js, 
sendo K6_WEB_DASHBOARD=true o que gera o grafico no navegador em tempo de execução
o K6_WEB_DASHBOARD_EXPORT=html-report.html que gera o arquivo html e o
k6 run tests/login.test.js o comando que roda normalmente a aplicação
Para abrir o html, clicar com o botão direito e selecionar reveal in finder*/