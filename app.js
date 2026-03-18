const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',     
    password: 'phmg2106', 
    database: 'loja'  
});

connection.connect((err) => {
    if (err) throw err; 
    console.log('Conectado ao MySQL!'); 
    
    executarFluxoCompleto();
});

function executarFluxoCompleto() {
  
    const nomeNovo = 'Teclado Mecânico';
    const valorNovo = 150.00;

    if (valorNovo < 0) { 
        console.log('Erro: Não é permitido preço negativo.');
        return connection.end();
    }

    const sqlInsert = "INSERT INTO produtos (nome, valor) VALUES (?, ?)"; 
    connection.query(sqlInsert, [nomeNovo, valorNovo], (err, result) => {
        if (err) throw err;
        const idProd = result.insertId; 
        console.log(`\n1. Produto criado com ID: ${idProd}`);

       
        const novoPreco = 120.00;
        const sqlUpdate = "UPDATE produtos SET valor = ? WHERE id = ?";
        
        connection.query(sqlUpdate, [novoPreco, idProd], (err) => {
            if (err) throw err;
            console.log(`2. Produto ${idProd} atualizado para R$ ${novoPreco}`);

            connection.query('SELECT * FROM produtos', (err, results) => {
                if (err) throw err; 
                console.log('3. Lista atual de produtos:', results); 

              
                const sqlDelete = "DELETE FROM produtos WHERE id = ?";
                connection.query(sqlDelete, [idProd], (err) => {
                    if (err) throw err;
                    console.log(`4. Produto ${idProd} removido com sucesso.`);
                    
                  
                    connection.end();
                    console.log('\nConexão encerrada.');
                });
            });
        });
    });
}