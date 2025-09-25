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
const { hqController } = require("../controllers/hqController");

const uploadFile = require("../util/uploader")("./app/public/imagem/perfil/");
// const uploadFile = require("../util/uploader")();

// SDK do Mercado Pago
const { MercadoPagoConfig, Preference } = require('mercadopago');
const { pedidoController } = require("../controllers/pedidoController");
// Adicione as credenciais
const client = new MercadoPagoConfig({
  accessToken: process.env.accessToken
});

router.get("/addItem", function (req, res) {
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
  verificarUsuAutorizado([1, 2, 3], "pages/restrito"),
  async function (req, res) {
    usuarioController.mostrarPerfil(req, res);
  }
);

router.post(
  "/perfil",
  uploadFile("imagem-perfil_usu"),
  usuarioController.regrasValidacaoPerfil,
  verificarUsuAutorizado([1, 2, 3], "pages/restrito"),
  async function (req, res) {
    usuarioController.gravarPerfil(req, res);
  }
);

router.get("/", verificarUsuAutenticado, function (req, res) {
  hqController.listar(req, res);
});

router.get("/favoritar", verificarUsuAutenticado, function (req, res) {
  hqController.favoritar(req, res);
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

router.get(
  "/adm",
  verificarUsuAutenticado,
  verificarUsuAutorizado([2, 3], "pages/restrito"),
  function (req, res) {
    res.render("pages/adm", req.session.autenticado);
  }
);

/*router.post("/create-preference", function (req, res) {
  const preference = new Preference(client);
  console.log(req.body.items);
  preference.create({
    body: {
      items: req.body.items,
      back_urls: {
        "success": process.env.URL_BASE + "/feedback",
        "failure": process.env.URL_BASE + "/feedback",
        "pending": process.env.URL_BASE + "/feedback"
      },
      auto_return: "approved",
    }
  })
    .then((value) => {
      res.json(value)
    })
    .catch(console.log)
});
*/
router.get("/feedback", function (req, res) {
  pedidoController.gravarPedido(req, res);
});
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
    res.render('pages/cadastro', {
        valores: {},
        avisoErro: {}
    });
});

router.post("/cadastro", (req, res) => {
    res.render("pages/cadastro", { 
        valores: req.body || {},
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

router.get('/homecomprador', verificarUsuAutorizado([1, 2, 3], "pages/entrar"), function(req, res){
    res.render('pages/homecomprador', {
        autenticado: req.session.autenticado
    });
});

router.get('/homevendedor', verificarUsuAutorizado([2, 3], "pages/entrar"), function(req, res){
    res.render('pages/homevendedor', {
        autenticado: req.session.autenticado
    });
});

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
    
    const brechoData = {
        nome: req.session.brecho_nome || 'Nome do Brechó',
        imagem: req.session.brecho_imagem || null,
        avaliacao: req.session.brecho_avaliacao || '0.0',
        itens_venda: req.session.brecho_itens_venda || '0',
        vendidos: req.session.brecho_vendidos || '0',
        seguidores: req.session.brecho_seguidores || '0'
    };
    
    res.render('pages/perfilvender', {
        brecho: brechoData
    });
})

router.get('/criarbrecho', function(req, res){
    res.render('pages/criarbrecho');
});

router.post('/criarbrecho', function(req, res){
    const { brecho, email, nome, password, senha, phone, cep, endereco, bairro, cidade, uf } = req.body;
    
   
    if (!req.session) {
        req.session = {};
    }
    
    console.log(req.body);
    

    if (!brecho || !email_usu || !nome_usu || !senha_usu || !fone_usu || !cep || !endereco || !bairro || !cidade || !uf) {
        return res.render('pages/criarbrecho', {
            erro: 'Todos os campos são obrigatórios',
            valores: req.body
        });
    }
    
    if (password !== senha) {
        return res.render('pages/criarbrecho', {
            erro: 'As senhas não coincidem',
            valores: req.body
        });
    }
    
    req.session.brecho_nome = brecho;
    req.session.brecho_email = email;
    req.session.brecho_proprietario = nome;
    req.session.brecho_telefone = phone;
    req.session.brecho_endereco = `${endereco}, ${bairro}, ${cidade} - ${uf}, ${cep}`;
    req.session.brecho_avaliacao = '5.0';
    req.session.brecho_itens_venda = '0';
    req.session.brecho_vendidos = '0';
    req.session.brecho_seguidores = '0';
    
    res.redirect('/perfilvender');
})



router.post('/criarbrecho', function(req, res){
    const { brecho, email_usu, nome_usu, senha_usu, fone_usu, cpf, } = req.body;
    
     if (!brecho || !email_usu || !nome_usu || !senha_usu || !fone_usu || !cpf) {
         return res.render('pages/criarbrecho', {
            erro: 'Todos os campos são obrigatórios'
        });
    }
      if (password !== senha) {
         return res.render('pages/criarbrecho', {
            erro: 'As senhas não coincidem'
       });
     }
    
    res.redirect('/perfilvender');
});

router.get('/entrar', function(req, res){
    res.render('pages/entrar', {
        listaErros: null,
        dadosNotificacao: null
    });
});

router.post('/entrar', usuarioController.regrasValidacaoFormLogin, gravarUsuAutenticado, function(req, res){
    usuarioController.logar(req, res);
});

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

router.get('/informacao', function(req, res){
    res.render('pages/informacao');
})

router.get('/perfilcliente', function(req, res){
    res.render('pages/perfilcliente');
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

router.get('/planos', function(req, res){
    res.render('pages/planos');
})

router.get('/perfilcliente', function(req, res){
   
    
    const userData = {
        nome: (req.session && req.session.autenticado && req.session.autenticado.nome) ? req.session.autenticado.nome : 'Maria Silva',
        email: (req.session && req.session.autenticado && req.session.autenticado.email) ? req.session.autenticado.email : 'maria.silva@email.com',
        telefone: (req.session && req.session.autenticado && req.session.autenticado.telefone) ? req.session.autenticado.telefone : '(11) 99999-9999',
        imagem: (req.session && req.session.autenticado && req.session.autenticado.imagem) ? req.session.autenticado.imagem : null,
        data_cadastro: (req.session && req.session.autenticado && req.session.autenticado.data_cadastro) ? req.session.autenticado.data_cadastro : 'Janeiro 2024',
        compras: (req.session && req.session.autenticado && req.session.autenticado.compras) ? req.session.autenticado.compras : 12,
        favoritos: (req.session && req.session.autenticado && req.session.autenticado.favoritos) ? req.session.autenticado.favoritos : 5,
        avaliacoes: (req.session && req.session.autenticado && req.session.autenticado.avaliacoes) ? req.session.autenticado.avaliacoes : 3
    };
    
    res.render('pages/perfilcliente', {
        usuario: userData,
        autenticado: req.session ? req.session.autenticado : null
    });
});


// home adm de teste //

router.get('/home-adm',function(req, res){
    res.render('pages/home-adm');
})



module.exports = router;