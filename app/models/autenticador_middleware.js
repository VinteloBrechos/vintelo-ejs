const { validationResult } = require ("express-validator");
const usuario = require("../models/usuarioModel");
const bcrypt = require ("bcryptjs");

verificarUsuAutenticado = (req, res, next) => {
    if (req.session.autenticado) {
        var autenticado = req.session.autenticado;
        req.session.logado = req.session.logado + 1;
    } else {
        var autenticado = { autenticado: null, id: null, tipo: null};
        req.session.logado = 0;
    }
    req.session.autenticado = autenticado;
    next();
};

limparSessao = (req, res, next ) => {
    req.session.destroy();
    next();
};

gravarUsuAutenticado = async (req, res, next) => {
    erros = validationResult(req);
    var autenticado = { autenticado: null, id: null, tipo: null};
    if(erros.isEmpty()) {
        var dadosForm = {
            user_usuario: req.body.nome_usu,
            senha_usuario: req.body.senha_usu,
        };
        var results = await usuario.findUserEmail(dadosForm);
        var total = Object.keys(results).length;
        if(total ==1){
            if (bcrypt.compareSync(dadosForm.senha_usuario, results[0].senha_usuario)) {
                var autenticado = {
                    autenticado: results[0].NOME_USUARIO,
                    id: results[0].ID_USUARIO,
                    tipo: results[0].TIPO_USUARIO, //COLOCAR NA TABELA USUARIO DO BANCO//
                    img_perfil_banco: results[0].img_perfil_banco != null ? `data:image/jpeg;base64,${results[0].img_perfil_banco.toString('base64')}` : null,
                    img_perfil_pasta: results[0].img_perfil_pasta,
                };
            }
        }
    }
    req.session.autenticado = autenticado;
    req.session.logado = 0 
    next();
};


module.exports = {
    verificarUsuAutenticado,
    limparSessao,
    gravarUsuAutenticado,
};