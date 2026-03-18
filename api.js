app.use(express.static('public'));
const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Configuração do Banco de Dados
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'phmg2106', // Troque pela sua senha
    database: 'loja'
});

// Rota Principal (READ) - Lista todos os produtos
app.get('/produtos', (req, res) => {
    connection.query('SELECT * FROM produtos', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results); // Retorna os produtos em formato JSON no navegador
    });
});

// Rota para Adicionar (CREATE) - Exemplo: /adicionar?nome=Mouse&valor=25
app.get('/adicionar', (req, res) => {
    const { nome, valor } = req.query;

    // DESAFIO: Validação de preço negativo [cite: 140]
    if (parseFloat(valor) < 0) {
        return res.send("Erro: O preço não pode ser negativo.");
    }

    const sql = "INSERT INTO produtos (nome, valor) VALUES (?, ?)";
    connection.query(sql, [nome, valor], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(`Produto ${nome} adicionado com sucesso! ID: ${result.insertId}`);
    });
});

// Rota para Deletar (DELETE) [cite: 139] - Exemplo: /deletar/1
app.get('/deletar/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM produtos WHERE id = ?";
    
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(`Produto com ID ${id} removido.`);
    });
});

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});