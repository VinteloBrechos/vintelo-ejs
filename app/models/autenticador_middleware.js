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
        }
    }
}