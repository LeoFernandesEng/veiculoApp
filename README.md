# Veículos App

Este projeto é uma aplicação para gerenciamento de veículos, desenvolvida com um backend em Spring Boot e um frontend em React. O objetivo é permitir a visualização, adição, edição e exclusão de veículos, além de possibilitar a aplicação de filtros.

## Requisitos

Antes de iniciar, você precisará das seguintes ferramentas instaladas:

- [Java JDK 17 ou superior](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) (para o backend)
- [Maven](https://maven.apache.org/download.cgi) (para gerenciar as dependências do backend)
- [Postgres](https://www.postgresql.org/)(Para gerenciar o bando de dados)
- [Node.js 16.x ou superior](https://nodejs.org/) (para o frontend)
- [npm](https://www.npmjs.com/get-npm) (gerenciador de pacotes do Node.js, normalmente instalado junto com o Node.js)

## Configuração do Backend

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    ```

2. **Navegue até o diretório do backend:**

    ```bash
    cd repositorio_clonado
    ```

3. **Configure o banco de dados:**

    - Certifique-se de que você tenha o PostgreSQL instalado e em execução.
    - Crie um banco de dados no PostgreSQL (por exemplo, `veiculosdb`).
    - Configure as credenciais do banco de dados no arquivo `src/main/resources/application.properties`. Atualize os seguintes parâmetros:

        ```properties
      spring.application.name=veiculos-app
      spring.datasource.url=jdbc:postgresql://localhost:5432/veiculosdb
      spring.datasource.username=user_app
      spring.datasource.password=user_pass
      spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
      spring.jpa.hibernate.ddl-auto=update
      spring.datasource.driver-class-name=org.postgresql.Driver
        ```

4. **Execute o backend:**

    ```bash
    Execute o spring aplication : VeiculosAppApplication.java na sua IDE de escolha. 
    ```

    O backend será iniciado na porta `8080` por padrão.

## Configuração do Frontend

1. **Navegue até o diretório do frontend:**

    ```bash
    cd repositorio_clonado/veiculo-frontend
    ```

2. **Instale as dependências:**

    ```bash
    npm install
    ```

3. **Inicie o frontend:**

    ```bash
    npm start
    ```

    O frontend será iniciado na porta `3000` por padrão.

## Uso

1. **Acesse a aplicação:**

    - Abra um navegador e acesse [http://localhost:3000](http://localhost:3000) para visualizar a interface do frontend.
    - Você poderá ver a lista de veículos e utilizar os filtros disponíveis.

2. **Funcionalidades:**

    - **Visualizar Veículos:** Acesse a lista de veículos, com detalhes de cada um.
    - **Adicionar Novo Veículo:** Clique no botão "Adicionar Novo Veículo" para abrir o formulário de adição.
    - **Editar Veículo:** Clique em "Editar" na lista de veículos para atualizar os detalhes.
    - **Excluir Veículo:** Clique em "Deletar" para remover um veículo da lista.
    - **Filtrar Veículos:** Utilize os campos de filtro para refinar a lista de veículos com base em marca, ano e cor.

## Estrutura do Projeto

- **Backend (Spring Boot):**
  - `src/main/java/com/app/veiculos_app`: Contém o código fonte do aplicativo Spring Boot.
  - `src/main/resources`: Contém arquivos de configuração e o `application.properties` para configuração do banco de dados.

- **Frontend (React):**
  - `src/components`: Contém os componentes React para as diferentes páginas da aplicação.
  - `public/index.html`: O arquivo HTML principal que inclui o script do React.

## Contribuição

Contribuições são bem-vindas! Para contribuir com o projeto:

1. Faça um fork do repositório.
2. Crie uma branch para a sua feature (`git checkout -b feature/nome-da-feature`).
3. Faça as modificações e commite suas alterações (`git commit -am 'Adiciona nova feature'`).
4. Faça o push para a sua branch (`git push origin feature/nome-da-feature`).
5. Abra um Pull Request.

## Contato

Para mais informações, entre em contato com [leonardobarroso@edu.unifor.br](mailto:seu-email@exemplo.com).

