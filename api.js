const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Configuração para servir o frontend (index.html) que está na pasta public
app.use(express.static('public'));

// Configuração do Banco de Dados com a tua senha
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'phmg2106', 
    database: 'loja'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao ligar ao MySQL:', err);
        return;
    }
    console.log('Conectado ao MySQL com sucesso!');
});

// Rota para listar produtos
app.get('/produtos', (req, res) => {
    connection.query('SELECT * FROM produtos', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Rota para adicionar produto
app.get('/adicionar', (req, res) => {
    const { nome, valor } = req.query;

    if (!nome || !valor || parseFloat(valor) < 0) {
        return res.status(400).send("Dados inválidos ou preço negativo.");
    }

    const sql = "INSERT INTO produtos (nome, valor) VALUES (?, ?)";
    connection.query(sql, [nome, valor], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(`Produto ${nome} adicionado!`);
    });
});

// Rota para eliminar produto
app.get('/deletar/:id', (req, res) => {
    const id = req.params.id;
    connection.query("DELETE FROM produtos WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).send(err);
        res.send("Removido.");
    });
});

// Rota para atualizar produto (UPDATE)
app.get('/atualizar', (req, res) => {
    const { id, nome, valor } = req.query;

    if (!id || !nome || !valor || parseFloat(valor) < 0) {
        return res.status(400).send("Dados inválidos.");
    }

    const sql = "UPDATE produtos SET nome = ?, valor = ? WHERE id = ?";
    connection.query(sql, [nome, valor, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send("Produto atualizado com sucesso!");
    });
});

app.listen(port, () => {
    console.log(`Servidor a correr em http://localhost:${port}`);
});