const configLocal = JSON.parse(open('../config/config.local.json'))

export function pegarBaseURL(){
    /*const baseURL = __ENV.BASE_URL || 'http://localhost:3000';
    esse 'http://localhost:3000' podera ser substituido por */
    const baseURL = __ENV.BASE_URL || configLocal.baseURL;
    return baseURL
    /*podemos escrever da forma  
    return __ENV.BASE_URL || 'http://localhost:3000'; que segundo o Julio 
    de Lima, fica mais bonito
    se for substutiir a url aqui tb, ficara return __ENV.BASE_URL || configLocal.baseURL
    */
}


  /*const url = 'http://localhost:3000/transferencias';
  colocado em variavel em linha de comando com o codigo 
  k6 run tests/transferencias.test.js -e BASE_URL=http://localhost:3000 
  Caso alguem esqueça de colocar a URL no comando para rodar, este arquivo tem por
  finalidade implementar a url como variavel de ambiente*/

  /*Percebe-se que todas as variaveis ou arqgumentos que se repetem, sao colocaros
  em arquivos separados como o config.local.json ou o variaveis.js para serem chamados
  em outros arquivos */