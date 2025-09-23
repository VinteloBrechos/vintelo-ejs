const {pedidoModel } = require("../models/pedidoModel");
const moment = require("moment");

const pedidoController = {

    gravarPedido: async (req, res) => {
        try {
          
            const usuarioId = req.session && req.session.autenticado && req.session.autenticado.id;
            const carrinho = Array.isArray(req.session && req.session.carrinho) ? req.session.carrinho : [];

            if (!usuarioId) {
                return res.redirect("/login");
            }
            if (!carrinho.length) {
                return res.redirect("/");
            }

            const camposJsonPedido = {
                data: moment().format("YYYY-MM-DD HH:mm:ss"),
                usuario_id_usuario: usuarioId,
                status_pedido: 1,
                status_pagamento: req.query.status || null,
                id_pagamento: req.query.payment_id || null
            };

            const create = await pedidoModel.createPedido(camposJsonPedido);

            const itemsPromises = carrinho.map(element => {
                const camposJsonItemPedido = {
                    pedido_id_pedido: create.insertId,
                    produto_id_produto: element.codproduto,
                    quantidade: element.qtde
                };
                return pedidoModel.createItemPedido(camposJsonItemPedido);
            });
            await Promise.all(itemsPromises);

            
            req.session.carrinho = [];
            return res.redirect("/");
        } catch (e) {
            console.error(e);
            return res.status(500).send("Erro ao gravar pedido");
        }
    }
    
}

module.exports = {pedidoController}