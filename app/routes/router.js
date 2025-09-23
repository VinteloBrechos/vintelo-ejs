var express = require("express");
var router = express.Router();

const {
  verificarUsuAutenticado,
  limparSessao,
  gravarUsuAutenticado,
  verificarUsuAutorizado,
} = require("../models/autenticador_middleware");

const { usuarioController } = require("../controllers/usuarioController");
const { carrinhoController } = require("../controllers/carrinhoController");
const { hqController } = require("../controllers/produtoController");

const uploadFile = require("../util/uploader")

const { MercadoPagoConfig, Preference } = require('mercadopago');
const { pedidoController } = require("../controllers/pedidoController");
const produtoController = require("../controllers/produtoController");

const client = new MercadoPagoConfig({
  accessToken: process.env.accessToken
});

router.get("/carrinho", function (req, res) {
  carrinhoController.addItem(req, res);
});

router.get("/removeItem", function (req, res) {
  carrinhoController.removeItem(req, res);
});

router.get("/excluirItem", function (req, res) {
  carrinhoController.excluirItem(req, res);
});

router.get("/listar-carrinho", function (req, res) {
  carrinhoController.listarcarrinho(req, res);
});

router.get(
  "/perfil",
  verificarUsuAutorizado([1, 2, 3], "pages/home"),
  async function (req, res) {
    usuarioController.mostrarPerfil(req, res);
  }
);

router.post(
  "/perfil1",
  uploadFile("imagem-perfil_usu"),
  usuarioController.regrasValidacaoPerfil,
  verificarUsuAutorizado([1, 2, 3], "pages/restrito"),
  async function (req, res) {
    usuarioController.gravarPerfil(req, res);
  }
);

router.get("/", verificarUsuAutenticado, function (req, res) {
  produtoController.listar(req, res);
});

router.get("/favoritar", verificarUsuAutenticado, function (req, res) {
    produtoController.favoritar(req, res);
});

router.get("/sair", limparSessao, function (req, res) {
  res.redirect("/");
});

router.get("/login", function (req, res) {
  res.render("pages/login", { listaErros: null, dadosNotificacao: null });
});

router.post(
  "/login",
  usuarioController.regrasValidacaoFormLogin,
  gravarUsuAutenticado,
  function (req, res) {
    usuarioController.logar(req, res);
  }
);

router.get("/cadastro", function (req, res) {
  res.render("pages/cadastro", {
    listaErros: null,
    dadosNotificacao: null,
    valores: { nome_usu: "", nomeusu_usu: "", email_usu: "", senha_usu: "" },
  });
});

router.post(
  "/cadastro",
  usuarioController.regrasValidacaoFormCad,
  async function (req, res) {
    usuarioController.cadastrar(req, res);
  }
);

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

router.post("/cadastro", (req, res) => {
    const valores = req.body; // ou o que você pegou do form
    res.render("pages/cadastro", { 
        valores: valores,
        avisoErro: {}
    });
});

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

router.get('/continuarcadastro', function(req, res){
    res.render('pages/continuarcadastro');
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

router.get('/avaliasao', function(req, res){
    res.render('pages/avaliasao');
})

router.get('/perfilvender', function(req, res){
    res.render('pages/perfilvender');
})

router.get('/criarbrecho', function(req, res){
    res.render('pages/criarbrecho');
})

router.get('/entrar', function(req, res){
    res.render('pages/entrar');
})

router.get('/esqueceusenha', function(req, res){
    res.render('pages/esqueceusenha');
})

router.get('/estatistica', function(req, res){
    res.render('pages/estatistica');
})

router.get('/categorias', function(req, res){
    res.render('pages/categorias');
})

router.get('/homedescontos', function(req, res){
    res.render('pages/homedescontos');
})

router.get('/homebrecho', function(req, res){
    res.render('pages/homebrecho');
})

router.get('/homenovidades', function(req, res){
    res.render('pages/homenovidades');
})

router.get('/minhascompras', function(req, res){
    res.render('pages/minhascompras');
})

router.get('/brecho', function(req, res){
    res.render('pages/brecho');
})

router.get('/homeplusize', function(req, res){
    res.render('pages/homeplusize');
})

router.get('/finalizandopagamento', function(req, res){
    res.render('pages/finalizandopagamento');
})

router.get('/pedidos', function(req, res){
    res.render('pages/pedidos');
})

router.get('/enviopedido', function(req, res){
    res.render('pages/enviopedido');
})

router.get('/menu', function(req, res){
    res.render('pages/menu');
})

router.get('/minhascomprasdesktop', function(req, res){
    res.render('pages/minhascomprasdesktop');
})

router.get('/menuvendedor', function(req, res){
    res.render('pages/menuvendedor');
})

router.get('/adicionardesktop', function(req, res){
    res.render('pages/adicionardesktop');
})

router.get('/pedidosdesktop', function(req, res){
    res.render('pages/pedidosdesktop');
})

router.get('/finalizandopagamento', function(req, res){
    res.render('pages/finalizandopagamento');
})

router.get('/blogdesktop', function(req, res){
    res.render('pages/blogdesktop');
})

router.get('/menufavoritos', function(req, res){
    res.render('pages/menufavoritos');
})

router.get('/menucompras', function(req, res){
    res.render('pages/menucompras');
})

router.get('/homepecasreformadas', function(req, res){
    res.render('pages/homepecasreformadas');
})

// validação //


module.exports = router;