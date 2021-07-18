# Escola CRUD
#### [Deploy](https://escola.carrilho.tech/)
![Project Image](https://i.ibb.co/R9Vts14/2021-07-18-11-40-escola-carrilho-tech.png)
# Ferramentas utilizadas

Angular, Material UI, Node.JS, Express, Docker, Docker-Compose, Jest, Sequelize e Postgres.

# Para executar
#### Docker Compose
```sh
$ docker-compose up
```
O site ficará disponível em **localhost:3001**.
#### NPM
Para executar através do NPM é necessário ter o **Postgres** e o **[Angular CLI](https://angular.io/cli)** instalados.
Modifique o arquivo **.env** da pasta */server* com as informações do banco de dados.
```sh
$ cd server
$ npm i
$ npm run dev
```
```sh
$ cd client
$ npm i
$ ng serve
```