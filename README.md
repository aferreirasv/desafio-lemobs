# Desafio Lemobs
Desafio prático da Lemobs
A API foi desenvolvida usando node.js, express, postgres, sequelize e docker.
A documentaçao foi feita utilizando Swagger e o serviços de teste utilizando mocha.

# Inicializando
Certifique-se de que tenha o [Docker](https://docs.docker.com/install/ "Docker") e [Docker Compose](https://docs.docker.com/compose/install/ "Docker Compose") instalado na máquina. Uma vez que ambos já estejam instalados e configurados corretamente, precisamos configurar o banco de dados.

Para rodar os scripts de criaçào e migração do banco, basta executar o comando:

`docker-compose run app npm run db:create && npm run db:migrate`

E então, ao terminado, inicializar a aplicação:

`docker-compose up app`

A porta padrão do servidor em ambiente de desenvolvimento é a **:3000**, podendo ser modificada na [variável de ambiente do docker compose](https://docs.docker.com/compose/environment-variables/ "variável de ambiente do docker compose") *"PORT"*.

# Testando
Foram implementados testes unitários para as funções de validar e formatar CPF. Basta rodar o script do npm:

`npm test`

# Documentação
Uma vez que o servidor tenha sido inicializado corretamente, a documentação gerada pelo swagger pode ser encontrada na rota raiz **(ex.:http://localhost:3000/)** da aplicação.
