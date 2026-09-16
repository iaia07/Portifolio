const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Configuração da conexão com o banco 'portfolio'
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345', // Altere se a sua senha do MySQL for diferente
    database: 'portfolio',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.get('/', (req, res) => {
    res.send('Servidor funcionando!');
});

app.post('/api/login', (req, res) => {
    const { email, senha } = req.body;

    console.log('Tentativa de login:', email);

    // Consulta adaptada à tabela 'usuario'
    const sql = `
        SELECT id_usuario AS id, email
        FROM usuario
        WHERE email = ? AND senha = ?
    `;

    db.query(sql, [email, senha], (err, results) => {
        if (err) {
            console.error('Erro no MySQL:', err);
            return res.status(500).json({
                success: false,
                message: 'Erro interno no servidor'
            });
        }

        if (results.length > 0) {
            console.log('Login realizado com sucesso!');
            return res.json({
                success: true,
                user: results[0]
            });
        } else {
            console.log('E-mail ou senha inválidos!');
            return res.status(401).json({
                success: false,
                message: 'E-mail ou senha inválidos!'
            });
        }
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});