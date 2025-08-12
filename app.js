const express = require('express');
const path = require('path');
const env = require('dotenv').config();

const app = express();

const app = express();

var session = require('express-session');
app.use(
  session({
    secret: "Vintelo",
    resave: false,
    saveUninitialized: false, 
  })
);

const port = process.env.PORT || 3000;

app.use(express.static("./app/public"));
app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'app/public')));

var rotas = require("./app/routes/routers");
app.use("/", rotas);

console.log("teste");

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
