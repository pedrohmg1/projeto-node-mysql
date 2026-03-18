const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(express.static('public'));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'phmg2106',
    database: 'loja'
});

// Listar produtos 
app.get('/produtos', (req, res) => {
    const { busca } = req.query;
    let sql = 'SELECT * FROM produtos';
    let params = [];

    if (busca) {
        sql += ' WHERE nome LIKE ? OR categoria LIKE ?';
        params = [`%${busca}%`, `%${busca}%`];
    }

    connection.query(sql, params, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Adicionar produto
app.get('/adicionar', (req, res) => {
    const { nome, valor, categoria, qtd } = req.query;
    const sql = "INSERT INTO produtos (nome, valor, categoria, quantidade) VALUES (?, ?, ?, ?)";
    connection.query(sql, [nome, valor, categoria || 'Geral', qtd || 0], (err) => {
        if (err) return res.status(500).send(err);
        res.send("Inserido");
    });
});

app.get('/atualizar', (req, res) => {
    const { id, nome, valor, categoria, qtd } = req.query;
    const sql = "UPDATE produtos SET nome = ?, valor = ?, categoria = ?, quantidade = ? WHERE id = ?";
    connection.query(sql, [nome, valor, categoria, qtd, id], (err) => {
        if (err) return res.status(500).send(err);
        res.send("Atualizado");
    });
});

// Atualizar estoque rápido
app.get('/stock', (req, res) => {
    const { id, acao } = req.query;
    const operacao = acao === 'aumentar' ? 'quantidade + 1' : 'quantidade - 1';
    const sql = `UPDATE produtos SET quantidade = ${operacao} WHERE id = ?`;
    connection.query(sql, [id], (err) => {
        if (err) return res.status(500).send(err);
        res.send("Estoque atualizado");
    });
});

// Deletar
app.get('/deletar/:id', (req, res) => {
    connection.query("DELETE FROM produtos WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.send("Removido");
    });
});

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));