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

const port = 3001;

app.use(express.static(path.join(__dirname, 'app/public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var rotas = require(path.join(__dirname, 'app/routes/routers'));
app.use("/", rotas);

console.log("teste");

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
}); 
