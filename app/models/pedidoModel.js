var pool = require("../config/pool_conexoes");

    const PedidoModel = {
        findAll: async () => {
            try {
                const [resultados] = await pool.query(
                    'SELECT * FROM PEDIDOS'
                )
                return resultados;
            } catch (error) {
                return error;
            }
        },
        
        findId: async (id) => {
            try {
                const [resultados] = await pool.query(
                    "select * from PEDIDOS where ID_PEDIDO = ?",
                    [id]
                )
                return resultados;
            } catch (error) {
                return error;
            }
        },

        createPedido: async (camposJson) => {
            try {
                const [resultados] = await pool.query(
                    "insert into PEDIDOS set ?",
                    [camposJson]
                )
                return resultados;
            } catch (error) {
                return error;
            }
        },
        
        createItemPedido: async (camposJson) => {
            try {
                const [resultados] = await pool.query(
                    "insert into PEDIDOS SET? ",
                    [camposJson]
                )
                return resultados;
            } catch (error) {
                return error;
            }
        },

        update: async (camposJson, id) => {
            try {
                const [resultados] = await pool.query(
                    "UPDATE PEDIDOS SET  ? WHERE ID_PEDIDO = ?",
                    [camposJson, id],
                )
                return resultados;
            } catch (error) {
                return error;
            }
        },
        
        delete: async (id) => {
            try {
                const [resultados] = await pool.query(
                    "UPDATE PEDIDOS SET STATUS = 0 WHERE ID_PEDIDO = ?", [id]
                )
                return resultados;
            } catch (error) {
                return error;
            }
        }
    };

module.exports = {PedidoModel}