# Banco API – Performance Tests

Projeto de **testes de performance** desenvolvido em **JavaScript com K6** para avaliar o desempenho da API [Banco API](https://github.com/juliodelimas/banco-api).  
O objetivo é medir tempo de resposta, throughput, uso de recursos e comportamento da API sob diferentes níveis de carga.

---

## 📖 Introdução

Este repositório contém scripts de teste de performance que simulam requisições reais à API **Banco API**, permitindo identificar gargalos e monitorar a estabilidade do sistema.  
Os testes foram estruturados para serem reutilizáveis, parametrizáveis e integráveis a pipelines de CI/CD.

---

## 🧰 Tecnologias utilizadas

- [K6](https://k6.io/docs/) – Ferramenta open-source de testes de carga e performance  
- [JavaScript (ES6)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) – Linguagem para escrita dos scripts  
- [Node.js](https://nodejs.org/en/) – Ambiente para execução de scripts auxiliares (opcional)  
- [GJSON] Para extração de dados em resposta JSON.
- Variaveis de ambiente para configuração dinamica ()ex: `BASE_URL`.

---

## 📂 Estrutura do repositório

```bash
banco-api-performance/
├── fixtures/                  # Dados de entrada para os testes(usuários, payloads)
├── tests/                     # Scripts principais de teste
│   ├── contas.test.js         # Teste de performance dos endpoints de contas
│   ├── clientes.test.js       # Teste de performance dos endpoints de clientes
│   └── ...                    # Outros cenários de teste
├── helpers/                    
│   └── autenticacao.js        # Funções utilitárias reutilizaveis para iteração com a API
├── config/                    # Arquivo de Exemplo de configuração de ambiente
├── utils/                     # Funções utilitárias e configurações comuns
│   └── variaveis.js
└── README.md                  # Este arquivo
```

---

## 🎯 Objetivo dos grupos de arquivos

| Diretório / Arquivo | Função |
|---------------------|--------|
| **tests/** | Contém os scripts de teste de performance, cada um representando um grupo de endpoints ou fluxo específico da API. |
| **fixtures/** | Guarda dados de entrada usados pelos testes, como payloads JSON. |
| **utils/** | Funções utilitárias e configurações comuns |
| **config/** *Arquivo de Exemplo de configuração de ambiente |
| **helpers/** *Funções utilitárias reutilizaveis para iteração |

---

## ⚙️ Modo de instalação

1. **Instale o [K6](https://k6.io/docs/getting-started/installation/)** em seu ambiente (recomendado via Homebrew, Chocolatey ou binário direto).  
2. Clone este repositório:

   ```bash
   git clone https://github.com/maframano/banco-api-performance.git
   cd banco-api-performance
   ```

3. Altere o arquivo `config.local.json` e defina a URL base da API a ser
testada:

   ```json
       {
          "baseURL": "http://localhost:3000"
       }
   ```

   > essas variaveis serão usadas dinamicamente nos testes para mostrar as requisições

---

## 🚀 Execução dos testes

Para executar os testes de performance, utilize o comando abaixo, informando a variável de ambiente `BASE_URL`:

```bash
k6 run tests/login.test.js
```
Certifique-se de passar a variável de ambiente `BASE_URL`, caso nao esteja usando um `config.local.json` ou uma abordagem de carregamento automatico
### 📊 Execução com dashboard em tempo real

Para acompanhar os resultados **em tempo real via navegador**, utilize as variáveis de ambiente do K6:

```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run tests/contas.test.js -e BASE_URL=http://localhost:3000 
```

- O K6 abrirá uma interface web local para acompanhamento dos resultados.  
- Ao término da execução, um relatório HTML completo será salvo no arquivo definido em `K6_WEB_DASHBOARD_EXPORT` (ex: `html-report.html`).

---

## 🔗 Referências úteis

- [Documentação oficial do K6](https://k6.io/docs/)  
- [Banco API (API alvo dos testes)](https://github.com/juliodelimas/banco-api)  
