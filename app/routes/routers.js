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
module.exports = router;
