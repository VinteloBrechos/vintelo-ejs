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
        body("senha_usu")
            .isStrongPassword()
            .withMessage("A senha deve ter no mínimo 8 caracteres (mínimo 1 letra, 1 caractere especial e 1 número)")
    ],

    regrasValidacaoFormCad: [ 
        body("nome_usu")
        .isLength({min: 3, max: 45})
        .withMessage("O nome deve conter entre 8 e 45 caracteres")
        .custom(async value => {
            const nomeUsu = await usuario.findCampoCustom({})
        })
    ]
}