import http from 'k6/http';
import { sleep, check } from 'k6';
const postLogin = JSON.parse(open('../fixtures/postLogin.json'))

export const options = {
   /*Define the number of iterations for the test
  iterations: 1,*/

  /*para trabalhar com usuarios virtuais[VA's] é 
  preciso remover as iterations
    vus:50,
    duration:'30s', */

    //stages serve para variar o acesso e a qt de usuarios ao longo to tempo
    stages: [
        {duration: '10s', target: 10 },
        {duration: '20s', target: 10 },
        {duration: '10s', target: 30 },
        {duration: '20s', target: 30 },
        {duration: '20s', target: 0 },
    ],

  //thresholds testa os limites dos percentis
  thresholds: {
    http_req_duration: ['p(90)<3000', 'max<5000'],
    http_req_failed: ['rate<0.01']
  }
}

export default function () {
 // const url = 'http://localhost:3000/login';
  const url = __ENV.BASE_URL + '/login';
  console.log(postLogin)
  const payload = JSON.stringify(postLogin);

 /* const payload = JSON.stringify({
     SUBSTITUIDO PELA VARIAVEL postLogin
    username: 'julio.lima',
    senha: '123456',} );*/

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