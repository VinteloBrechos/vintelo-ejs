
const express = require('express');
const path = require('path');
const env = require('dotenv').config();

var session = require('express-session');
app.use(
  session({
    secret: "Vintelo",
    resave: false,
    saveUninitializede: false,
  }));


const app = express();
const port = 3000;

app.use(express.static("./app/public"));

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.json())
app.use(express.static(path.join(__dirname, 'app/public')))


var rotas = require("./app/routes/routers");
app.use("/", rotas);

console.log("teste")

app.listen(process.env.PORT,() => {
  console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
});

//teste fork//