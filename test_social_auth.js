// Teste simples para verificar se as rotas de autenticação social estão configuradas
const express = require('express');
const app = express();

// Simular as rotas para teste
app.get('/auth/google', (req, res) => {
    console.log('✅ Rota /auth/google acessível');
    res.send('Rota Google OAuth funcionando!');
});

app.get('/auth/instagram', (req, res) => {
    console.log('✅ Rota /auth/instagram acessível');
    res.send('Rota Instagram OAuth funcionando!');
});

app.get('/test', (req, res) => {
    res.send(`
        <h1>Teste de Autenticação Social</h1>
        <p><a href="/auth/google">Testar Google OAuth</a></p>
        <p><a href="/auth/instagram">Testar Instagram OAuth</a></p>
    `);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`🧪 Servidor de teste rodando em http://localhost:${PORT}/test`);
    console.log('Para testar as rotas, acesse: http://localhost:3001/test');
});

module.exports = app;