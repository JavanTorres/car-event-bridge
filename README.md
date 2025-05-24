# Vehicle Event Bridge POC

## Pré-requisitos

* **Docker** instalado
* **Node.js** (NPM, PNPM ou Yarn)

## Instalação e execução

1. Clone este repositório e acesse a pasta do projeto:

   ```bash
   git clone <url-do-repositorio>
   cd <nome-do-projeto>
   ```
2. Execute em modo de desenvolvimento com Docker:

   ```bash
   npm run start:docker:dev
   ```

   > **Nota:** dependendo do hardware, pode ocorrer o seguinte erro no Kafka:
   >
   > ```json
   > {"level":"ERROR","timestamp":"2025-05-24T21:38:51.410Z","logger":"kafkajs","message":"[BrokerPool] Closed connection","retryCount":1,"retryTime":504}
   > ```

   Se isso acontecer, aguarde alguns segundos e rode o comando novamente, pois o container do Kafka precisará de tempo para subir completamente.

## UIs

* **Interface da base de dados:**
  [http://localhost:8081/db/mydb/](http://localhost:8081/db/mydb/)
* **Interface do Kafka:**
  [http://localhost:8080/ui/clusters/kraft-cluster/all-topics](http://localhost:8080/ui/clusters/kraft-cluster/all-topics)

## Pontos Importantes

* 📩 **Envio de mensagens:**
  As mensagens são enviadas para o **Kafka** **sempre** e **apenas** quando um veículo é criado. Acesse o tópico para visualizar as mensagens em tempo real.
* 🔄 **Hot-reload:**
  O container do **Node.js** monta a pasta do projeto via volume. Quaisquer alterações nos arquivos serão aplicadas automaticamente graças ao watch.
* 🌐 **Rede do Kafka:**
  Ainda não foi configurado para aceitar conexões simultâneas em `localhost` e na rede interna do Docker.
  Se você tentar subir o projeto com `pnpm start:dev` ou `yarn start:dev`, a conexão com o Kafka falhará.
* 🛠️ **Refatoração Arquitetural:**
  Muitas questões arquiteturais podem e devem ser refatoradas/implementadas. Por exemplo, a forma como os mappers foram implementados pode dificultar testes **E2E**, existem algumas repetições, etc.

## Tecnologias Utilizadas

* Node.js
* Kafka
* MongoDB
* PNPM
* NestJS

---
