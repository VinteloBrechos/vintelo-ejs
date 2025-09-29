const usuario = require("../models/usuarioModel");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(12);
const {removeImg} = require("../util/removeImg");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const https = require('https');

const usuarioController = {

    regrasValidacaoFormLogin: [
        body("nome_usu")
            .isLength({ min: 3, max: 45 }).withMessage("Nome deve ter de 3 a 45 caracteres!"),
        body("nomeusu_usu")
            .isLength({ min: 8, max: 45 }).withMessage("Nome de usuário deve ter de 8 a 45 caracteres!")
            .custom(async value => {
                const nomeUsu = await usuario.findCampoCustom({ 'user_usuario': value });
                if (nomeUsu > 0) {
                    throw new Error('Nome de usuário em uso!');
                }
            }),
        body("email_usu")
            .isEmail().withMessage("Digite um e-mail válido!")
            .custom(async value => {
                const nomeUsu = await usuario.findCampoCustom({ 'email_usuario': value });
                if (nomeUsu > 0) {
                    throw new Error('E-mail em uso!');
                }
            }),
        body("senha_usu")
            .isStrongPassword()
            .withMessage("A senha deve ter no mínimo 8 caracteres (mínimo 1 letra maiúscula, 1 caractere especial e 1 número)")
    ],

    regrasValidacaoFormCad: [
        body("nome_usu")
            .isLength({ min: 3, max: 45 }).withMessage("Nome deve ter de 3 a 45 caracteres!"),
        body("nomeusu_usu")
            .isLength({ min: 8, max: 45 }).withMessage("Nome de usuário deve ter de 8 a 45 caracteres!")
            .custom(async value => {
                const nomeUsu = await usuario.findCampoCustom({ 'user_usuario': value });
                if (nomeUsu > 0) {
                    throw new Error('Nome de usuário em uso!');
                }
            }),
        body("email_usu")
            .isEmail().withMessage("Digite um e-mail válido!")
            .custom(async value => {
                const nomeUsu = await usuario.findCampoCustom({ 'email_usuario': value });
                if (nomeUsu > 0) {
                    throw new Error('E-mail em uso!');
                }
            }),
        body("senha_usu")
            .isStrongPassword()
            .withMessage("A senha deve ter no mínimo 8 caracteres (mínimo 1 letra maiúscula, 1 caractere especial e 1 número)")
    ],


    regrasValidacaoPerfil: [
        body("nome_usu")
            .isLength({ min: 3, max: 45 }).withMessage("Nome deve ter de 3 a 45 caracteres!"),
        body("nomeusu_usu")
            .isLength({ min: 8, max: 45 }).withMessage("Nome de usuário deve ter de 8 a 45 caracteres!"),
        body("email_usu")
            .isEmail().withMessage("Digite um e-mail válido!"),
        body("fone_usu")
            .isLength({ min: 12, max: 15 }).withMessage("Digite um telefone válido!"),
        body("cep")
            .isPostalCode('BR').withMessage("Digite um CEP válido!"),
        body("numero")
            .isNumeric().withMessage("Digite um número para o endereço!"),
    ],

    logar: (req, res) => {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            return res.render("pages/perfilcliente", { listaErros: erros, dadosNotificacao: null })
        }
        if (req.session.autenticado.autenticado != null) {
            res.redirect("/");
        } else {
            res.render("pages/login", {
                listaErros: null,
                dadosNotificacao: { titulo: "Falha ao logar!", mensagem: "Usuário e/ou senha inválidos!", tipo: "error" }
            })
        }
    },


    cadastrar: (req, res) => {
        const erros = validationResult(req);
        var dadosForm = {
            USER_USUARIO: req.body.nomeusu_usu,
            SENHA_USUARIO: bcrypt.hashSync(req.body.senha_usu, salt),
            NOME_USUARIO: req.body.nome_usu,
            EMAIL_USUARIO: req.body.email_usu,
        };
        if (!erros.isEmpty()) {
            return res.render("pages/homecomprador", { listaErros: erros, dadosNotificacao: null, valores: req.body })
        }
        try {
            let create = usuario.create(dadosForm);
            res.render("pages/homecomprador", {
                listaErros: null, dadosNotificacao: {
                    titulo: "Cadastro realizado!", mensagem: "Novo usuário criado com sucesso!", tipo: "success"
                }, valores: req.body
            })
        } catch (e) {
            console.log(e);
            res.render("pages/cadastro", {
                listaErros: erros, dadosNotificacao: {
                    titulo: "Erro ao cadastrar!", mensagem: "Verifique os valores digitados!", tipo: "error"
                }, valores: req.body
            })
        }
    },


    mostrarPerfil: async (req, res) => {
        try {
            let results = await usuario.findId(req.session.autenticado.id);
            if (results[0].CEP_USUARIO != null) {
                const httpsAgent = new https.Agent({
                    rejectUnauthorized: false,
                });
                const response = await fetch(`https://viacep.com.br/ws/${results[0].cep_usuario}/json/`,
                    { method: 'GET', headers: null, body: null, agent: httpsAgent, });
                var viaCep = await response.json();
                var cep = results[0].cep_usuario.slice(0,5)+ "-"+results[0].cep_usuario.slice(5)
            }else{
                var viaCep = {logradouro:"", bairro:"", localidade:"", uf:""}
                var cep = null;
            }

            let campos = {
                nome_usu: results[0].NOME_USUARIO, EMAIL_USUARIO: results[0].EMAIL_USUARIO,
                cep:  CEP_USUARIO, 
                numero: results[0].NUMERO_USUARIO,
                complemento: results[0].COMPLEMENTO_USUARIO, logradouro: viaCep.logradouro,
                bairro: viaCep.bairro, localidade: viaCep.localidade, uf: viaCep.uf,
                img_perfil_pasta: results[0].img_perfil_pasta,
                img_perfil_banco: results[0].img_perfil_banco != null ? `data:image/jpeg;base64,${results[0].img_perfil_banco.toString('base64')}` : null,
                nomeusu_usu: results[0].USER_USUARIO, fone_usu: results[0].CELULAR_USUARIO, senha_usu: ""
            }

            res.render("pages/perfilvender", { listaErros: null, dadosNotificacao: null, valores: campos })
        } catch (e) {
            console.log(e);
            res.render("pages/informacao", {
                listaErros: null, dadosNotificacao: null, valores: {
                    img_perfil_banco: "", img_perfil_pasta: "", nome_usu: "", email_usu: "",
                    nomeusu_usu: "", fone_usu: "", senha_usu: "", cep: "", numero: "", complemento: "",
                    logradouro: "", bairro: "", localidade: "", uf: ""
                }
            })
        }
    },

    gravarPerfil: async (req, res) => {

        const erros = validationResult(req);
        const erroMulter = req.session.erroMulter;
        if (!erros.isEmpty() || erroMulter != null ) {
            lista =  !erros.isEmpty() ? erros : {formatter:null, errors:[]};
            if(erroMulter != null ){
                lista.errors.push(erroMulter);
            } 
            return res.render("pages/perfil", { listaErros: lista, dadosNotificacao: null, valores: req.body })
        }
        try {
            var dadosForm = {
                USER_USUARIO: req.body.nomeusu_usu,
                NOME_USUARIO: req.body.nome_usu,
                EMAIL_USUARIO: req.body.email_usu,
                CELULAR_USUARIO_U: req.body.fone_usu,
                CEP_USUARIO: req.body.cep.replace("-",""),
                NUMERO_USUARIO: req.body.numero,
                COMPLEMENTO_USUARIO: req.body.complemento,
                IMG_PERFIL_BANCO: req.session.autenticado.img_perfil_banco,
                IMG_PERFIL_PASTA: req.session.autenticado.img_perfil_pasta,
            };
            if (req.body.senha_usu != "") {
                dadosForm.SENHA_USUARIO = bcrypt.hashSync(req.body.senha_usu, salt);
            }
            if (!req.file) {
                console.log("Falha no carregamento");
            } else {
               
                caminhoArquivo = "imagem/perfil/" + req.file.filename;
              
                if(dadosForm.IMG_PERFIL_PASTA != caminhoArquivo ){
                    removeImg(dadosForm.IMG_PERFIL_PASTA);
                }
                dadosForm.img_perfil_pasta = caminhoArquivo;
                dadosForm.img_perfil_banco = null;

            }
            let resultUpdate = await usuario.update(dadosForm, req.session.autenticado.id);
            if (!resultUpdate.isEmpty) {
                if (resultUpdate.changedRows == 1) {
                    var result = await usuario.findId(req.session.autenticado.id);
                    var autenticado = {
                        autenticado: result[0].NOME_USUARIO,
                        id: result[0].ID_USUARIO,
                        tipo: result[0].ID_TIPO_USUARIO,
                        img_perfil_banco: result[0].IMG_PERFIL_BANCO != null ? `data:image/jpeg;base64,${result[0].img_perfil_banco.toString('base64')}` : null,
                        img_perfil_pasta: result[0].IMG_PERFIL_PASTA
                    };
                    req.session.autenticado = autenticado;
                    var campos = {
                        nome_usu: result[0].NOME_USUARIO, EMAIL_USUARIO: result[0].EMAIL_USUARIO,
                        img_perfil_pasta: result[0].IMG_PERFIL_PASTA, IMG_PERFIL_BANCO: result[0].IMG_PERFIL_BANCO,
                        nomeusu_usu: result[0].USER_USUARIO, fone_usu: result[0].CELULAR_USUARIO, senha_usu: ""
                    }
                    res.render("pages/homecomprador", { listaErros: null, dadosNotificacao: { titulo: "Perfil! atualizado com sucesso", mensagem: "Alterações Gravadas", tipo: "success" }, valores: campos });
                }else{
                    res.render("pages/homecomprador", { listaErros: null, dadosNotificacao: { titulo: "Perfil! atualizado com sucesso", mensagem: "Sem alterações", tipo: "success" }, valores: dadosForm });
                }
            }
        } catch (e) {
            console.log(e)
            res.render("pages/perfilcliente", { listaErros: erros, dadosNotificacao: { titulo: "Erro ao atualizar o perfil!", mensagem: "Verifique os valores digitados!", tipo: "error" }, valores: req.body })
        }
    }
}

module.exports = usuarioController