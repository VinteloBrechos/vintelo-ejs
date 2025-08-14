const usuario = require("../models/usuarioModel");
const { body, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(12);
const {removeImg} = require("../util/removeImg");
const fetch = (...args) =>('node-fetch').then(({default: fetch}) => fetch(...args));
const https = require("https");

const usuarioController = {
    regrasValidacaoFormLogin: [
        body("nome_usu")
            .isLength({min: 8, max: 45})
            .withMessage("O nome deve conter pelo menos 8 caracteres!"),
        body("")
    ]
}