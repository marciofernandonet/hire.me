# Teste Shorten URL

## Instalação

1. Faça o clone deste projeto;
2. Entre na pasta e instale as dependências com `npm install`;

## Testando a aplicação em desenvolvimento

### Inicializando o Banco de Dados

O banco de dados para a aplicação é o MongoDB, para inicializá-lo é preciso executar o comando `mongod` em um terminal separado.

### Rodando a API

Na pasta do projeto digite o seguinte comando para iniciar o servidor `npm run dev`, duas mensagens são exibidas _"Servidor rodando na porta: 3001"_ e _"Banco de dados conectado"_.  O arquivo de configução para o banco de dados é o database.js, ele está na pasta _"/src/config/database.js"_, se precisar realizar alguma alteração, como exemplo trocar a porta de conexão com o banco de dados basta alterar o arquivo de configuração das variáveis de ambiente _".env"_ que fica na raiz do projeto, mas por padrão a porta do MongoDB é a 27017.

### Testando a API

A API roda sobre o seguinte endereço `http://localhost:3001`.

1 - Shorten URL

- Chamada sem CUSTOM_ALIAS

```json
PUT http://localhost:3001/create?url=http://www.vale.com

{
    "_id": "5e2ee9571e1765046cb9dc06",
    "alias": "fX2QHD6",
    "url": "localhost:3001/fX2QHD6",
    "urlOrig": "http://www.vale.com",
    "statistics": {
        "time_taken": "23ms"
    }
}
```

- Chamada com CUSTOM_ALIAS

```json
PUT http://localhost:3001/create?url=http://www.vale.com&CUSTOM_ALIAS=vale

{
    "_id": "5e2ee9b11e1765046cb9dc07",
    "alias": "vale",
    "url": "localhost:3001/vale",
    "urlOrig": "http://www.vale.com",
    "statistics": {
        "time_taken": "4ms"
    }
}
```

- Chamada com CUSTOM_ALIAS que já existe

```json
PUT http://localhost:3001/create?url=http://www.vale.com&CUSTOM_ALIAS=vale

{
    "alias": "vale",
    "ERR_CODE": "001",
    "Description": "CUSTOM ALIAS ALREADY EXISTS"
}
```

2 - Retrieve URL

- Caso a URL não exista

```json
GET http://localhost:3001/site

{
    "alias": "site",
    "ERR_CODE": "002",
    "Description": "SHORTENED URL NOT FOUND"
}
```

- Caso a URL exista a página é redirecionada automaticamente `GET http://localhost:3001/vale`

## Mais funcionalidades

### Testcases

Os testes foram realizados com o framework Mocha e a _lib_ Chai, o código está presente no arquivo _tests.js_ na pasta _test_ que fica na raiz do projeto. Para rodar os testes basta executar `npm test` na raiz do projeto.

### Endpoint que mostre as dez URL's mais acessadas

GET `http://localhost:3001/most_accessed`

### Client para a API

O cliente da API foi desenvolvido com React, acesse o repositório [aqui](https://github.com/marciofernandonet/shorten-app). e siga as instruções:

1. Faça o clone do projeto;
2. Entre na pasta e instale as dependências com `npm install`;
3. Execute o aplicação com `npm start` e aguarde o serviço rodar. Abra [http://localhost:3000](http://localhost:3000) para visualizá-lo no navegador;

Exemplo funcional da aplicação: https://shorten-client.herokuapp.com

O link da API está no endereço: https://shorten-api.herokuapp.com. Exemplo para o endpoint dos URL's mais acessadas https://shorten-api.herokuapp.com/most_accessed

### Deploy utilizando containers

O deploy utilizando containers foi criado com o Docker e Docker Compose como orquestrador. O arquivo _docker-compose.yml_ se encontra na raiz do projeto, utilize o comando `docker-compose up -d` para rodar os serviços do DB e da API. O endereço de acesso externo é o `http://localhost:3001`.