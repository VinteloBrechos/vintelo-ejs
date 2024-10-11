// load the things we need
const express = require('express');
const path = require('path');


const app = express();
const port = 3000;

app.use(express.static("./app/public"));

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.json())
app.use(express.static(path.join(__dirname, 'app/public')))


const rotas = require("./app/routes/routers");
app.use("/", rotas);

console.log("teste")

app.listen(port,() => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

//                                          carrossel dos artigos

const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const carouselSlide = document.querySelector('.carousel-slide');
const images = document.querySelectorAll('.carousel-slide img');

let counter = 0;
const size = images[0].clientWidth;

//                                       Função para mover o carrossel
function moveCarousel() {
  carouselSlide.style.transform = `translateX(${-size * counter}px)`;
}

//                                          Botão de próxima imagem
nextButton.addEventListener('click', () => {
  if (counter >= images.length - 1) return; 
  counter++;
  moveCarousel();
});

//                                             Botão de imagem anterior
prevButton.addEventListener('click', () => {
  if (counter <= 0) return; 
  counter--;
  moveCarousel();
});

//                                             Redimensionamento dinâmico 
window.addEventListener('resize', () => {
  size = images[0].clientWidth;
  moveCarousel();
});
