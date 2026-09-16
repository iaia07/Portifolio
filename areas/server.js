const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'portifolio2',
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

    const sql = `
        SELECT id, nome, email
        FROM usuarios
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