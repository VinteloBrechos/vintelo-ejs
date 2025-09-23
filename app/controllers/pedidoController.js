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
                USUARIO_ID_USUARIOo: usuarioId,
                STATUS_PEDIDO: 1,
                STATUS_PAGAMENTO: req.query.status || null,
                ID_PAGAMENTO: req.query.payment_id || null
            };

            const create = await pedidoModel.createPedido(camposJsonPedido);

            const itemsPromises = carrinho.map(element => {
                const camposJsonItemPedido = {
                    PEDIDO_ID_PEDIDO: create.insertId,
                    PRODUTO_ID_PRODUTO: element.codproduto,
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