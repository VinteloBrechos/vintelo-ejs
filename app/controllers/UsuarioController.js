const usuario = require("../models/usuarioModel");
const { body, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(12);
const {removeImg} = require("../util/removeImg");
