var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('pages/index');
})

router.get('/artigo', function(req, res){
    res.render('pages/artigo');
})

router.get('/login', function(req, res){
    res.render('pages/login');
})

router.get('/vestidos', function(req, res){
    res.render('pages/vestidos');
})

router.get('/saias', function(req, res){
    res.render('pages/saias');
})


router.get('/blusas', function(req, res){
    res.render('pages/blusas');
})


router.get('/acessorios', function(req, res){
    res.render('pages/acessorios');
})

router.get('/index', function(req, res){
    res.render('pages/index');
})

router.get('/produto1', function(req, res){
    res.render('pages/produto1');
})

router.get('/produto2', function(req, res){
    res.render('pages/produto2');
})

router.get('/produto3', function(req, res){
    res.render('pages/produto3');
})

router.get('/produto4', function(req, res){
    res.render('pages/produto4');
})

router.get('/cadastro', function(req, res){
    res.render('pages/cadastro');
})

router.get('/carrinho', function(req, res){
    res.render('pages/carrinho');
})

router.get('/perfil1', function(req, res){
    res.render('pages/perfil1');
})

router.get('/perfil2', function(req, res){
    res.render('pages/perfil2');
})

router.get('/perfil3', function(req, res){
    res.render('pages/perfil3');
})

router.get('/homecomprador', function(req, res){
    res.render('pages/homecomprador');
})

router.get('/homevendedor', function(req, res){
    res.render('pages/homevendedor');
})

router.get('/criarbrecho', function(req, res){
    res.render('pages/criarbrecho');
})

router.get('/adicionar', function(req, res){
    res.render('pages/adicionar');
})

router.get('/blog', function(req, res){
    res.render('pages/blog');
})

router.get('/bossartigo', function(req, res){
    res.render('pages/bossartigo');
})

router.get('/gucciartigo', function(req, res){
    res.render('pages/gucciartigo');
})

router.get('/ecologicoartigo', function(req, res){
    res.render('pages/ecologicoartigo');
})

router.get('/tensustentavel', function(req, res){
    res.render('pages/tensustentavel');
})

router.get('/sweer', function(req, res){
    res.render('pages/sweer');
})

router.get('/sacola', function(req, res){
    res.render('pages/sacola');
})

router.get('/pedidoconf', function(req, res){
    res.render('pages/pedidoconf');
})

router.get('/finalizandocompra1', function(req, res){
    res.render('pages/finalizandocompra1');
})

router.get('/finalizandocompra2', function(req, res){
    res.render('pages/finalizandocompra2');
})

router.get('/finalizandocompra3', function(req, res){
    res.render('pages/finalizandocompra3');
})

router.get('/finalizandocompra4', function(req, res){
    res.render('pages/finalizandocompra4');
})

router.get('/favoritos', function(req, res){
    res.render('pages/favoritos');
})

router.get('/sacola1', function(req, res){
    res.render('pages/sacola1');
})

router.get('/avaliaçao', function(req, res){
    res.render('pages/avaliaçao');
})

module.exports = router;
