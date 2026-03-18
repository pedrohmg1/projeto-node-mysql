## Sistema de Gerenciamento de Produtos - CRUD

Aplicação Full Stack desenvolvida em Node.js para gerenciamento de registros em banco de dados relacional. O projeto implementa as quatro operações fundamentais do CRUD (Create, Read, Update, Delete).

## 1. Banco de Dados
Execute os seguintes comandos SQL para preparar o esquema de dados:

```sql
CREATE DATABASE loja;
USE loja;

CREATE TABLE produtos (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    valor DOUBLE NOT NULL,
    PRIMARY KEY (id)
);
```
## 3. Configuração de Credenciais

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'phmg2106',
    database: 'loja'
});


## Navegue até o diretório do projeto e execute:

npm install express mysql2

## Inicie o servidor de aplicação:

node api.js

## Acesse a interface através do endereço: http://localhost:3000