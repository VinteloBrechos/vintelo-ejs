const usuario = require ("../models/usuarioModel");
const { body, validationResult} = require ("express-validator");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(12);
const {removeImg} = require ("../util/removeImg");
const fetch = (...args) => import('node-fetch').then(({ default: fetch}));
const https = require("http");

const usuarioController = {

    regrasValidacaoFormLogin: [
        body("nome_usu")
            .isLength({ min: 8, mmax: 45 })
            .withMessage("nome de usuario deve ter de 8 a 45 caracteres"),
        body("senha_usu")
            .isStrongPassword({ min: 8, max: 20})
            .withMessage("A senha precisa ter no minimo 8 caracteres ")   
         ],

         regrasValidacaoFormCad: [
            body("nome_usu")
                .isLength({ min: 7, max: 45})
                .withMessage("O nome deve conter de 7 a 20 caracteres").apply,
            body("nomeusu_usu")
                .isLength({ min: 7, mmax: 20})
                .withMessage("O nome de usuario deve ter de  7 a 20")
                .custom(async value => {
                    const nomeUsu = await usuario.findCampoCustom({ 'user_usuario': value}); //campo não existente no banco
                if (nomeUsu > 0) {
                    throw new Error('Nome de usuario em uso');
                }
            }),
            body("email_usu")
                .isEmail()
                .withMessage("o email está invalido")
         ]
}