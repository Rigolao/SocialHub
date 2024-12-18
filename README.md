# SocialHub - README

## Descrição

Este projeto é composto por uma aplicação full-stack para o sistema **SocialHub**, que inclui um back-end baseado em Spring Boot e um front-end desenvolvido com Vite. A base de dados é gerida por MySQL, configurado via Docker Compose.

---

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em seu ambiente:

- **Java 17** ou superior
- **Maven** (para gerenciamento de dependências no back-end)
- **Node.js** (recomendado versão 18 ou superior)
- **Docker** e **Docker Compose**

---

## Como rodar o projeto

### 1. Configurando o banco de dados com Docker Compose

1. Navegue até o diretório onde o arquivo `compose.yaml` está localizado.
2. Execute o seguinte comando para iniciar o banco de dados:

   ```bash
   docker-compose up -d
   ```

   Isso irá iniciar um contêiner MySQL com as seguintes configurações:
    - Nome do banco de dados: `socialhub`
    - Senha do usuário root: `admin`
    - Porta local: `3306`

### 2. Rodando o back-end

1. Navegue até o diretório do back-end (onde está o arquivo `pom.xml`).
2. Instale as dependências e compile o projeto com Maven:

   ```bash
   mvn clean install
   ```

3. Execute a aplicação Spring Boot:

   ```bash
   mvn spring-boot:run
   ```

4. O back-end estará disponível em: [http://localhost:8080](http://localhost:8080)

---

### 3. Rodando o front-end

1. Navegue até o diretório do front-end (onde está o arquivo `package.json`).
2. Instale as dependências do projeto:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. O front-end estará disponível em: [http://localhost:5173](http://localhost:5173)

---

## Scripts úteis

### Back-end
- **Executar testes:**
  ```bash
  mvn test
  ```

- **Gerar um build para produção:**
  ```bash
  mvn package
  ```

### Front-end
- **Gerar um build para produção:**
  ```bash
  npm run build
  ```

- **Verificar erros de lint:**
  ```bash
  npm run lint
  ```

- **Visualizar a aplicação em modo de produção:**
  ```bash
  npm run preview
  ```

---

## Observações

- O projeto utiliza **Flyway** para gerenciamento de migrações de banco de dados. Certifique-se de que as configurações no `application.properties` estão corretas antes de rodar a aplicação.
- A documentação da API está integrada ao back-end via **SpringDoc OpenAPI**. Acesse a documentação em: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

---

## Tecnologias Utilizadas

- **Back-end:** Spring Boot 3.3.1, Flyway, MySQL, Spring Security
- **Front-end:** React, Vite, TailwindCSS
- **Banco de Dados:** MySQL via Docker
- **Outras Ferramentas:** Docker Compose, ESLint, TypeScript

--- 

Se precisar de suporte, consulte a equipe de desenvolvimento. 🎉
