const express = require('express');
const path = require('path');
const env = require('dotenv').config();

const app = express();


var session = require('express-session');
app.use(
  session({
    secret: "Vintelo",
    resave: false,
    saveUninitialized: false, 
  })
);

const PORT = process.env.PORT || 3000;

// Debug das variáveis de ambiente
console.log('Variáveis de ambiente:');
console.log('HOST:', process.env.HOST);
console.log('USER:', process.env.USER);
console.log('DATABASE:', process.env.DATABASE);
console.log('PORT DB:', process.env.PORT);

app.use(express.static(path.join(__dirname, 'app/public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var rotas = require(path.join(__dirname, 'app/routes/routers'));
app.use("/", rotas);

console.log("teste");

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
}); 
