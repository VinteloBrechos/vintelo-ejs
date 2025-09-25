const moment = require("moment");
var pool = require("../config/pool_conexoes");

const produtoModel = {
    findAll: async (id = null) => {
        try {
            const [resultados] = await pool.query("SELECT h.ID_PRODUTO, h.NOME_PRODUTO, h.DESCRICAO_PRODUTO, h.IMAGEM_PRODUTO, " +
                " h.PRECO_PRODUTO, h.STATUS_PRODUTOS, IF(f.PRODUTO_ID_PRODUTO > 0, 'favorito', 'favoritar') as favorito  " +
                " FROM PRODUTOS h " +
                " left join favorito f " +
                " on ((h.ID_PRODUTO = f.PRODUTO_ID_PRODUTO and f.USUARIO_ID_USUARIO = ?) and f.STATUS_USUARIO =1)", [id]);
                return resultados;
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    findID: async (id) => {
        try {
            const [resultados] = await pool.query("SELECT * FROM PRODUTOS where ID_PRODUTO = ? ", [id]);
            return resultados;
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    FindPage: async (pagina, total) => {
        try {
            const [resultados] = await pool.query("SELECT * FROM PRODUTOS  limit ?, ?", [pagina, total]);
            return resultados;
        } catch (error) {
            console.log(error);
            return error;
        }

    },

    TotalReg: async () => {
        try {
            const [resultados] = await pool.query('SELECT count(*) total FROM PRODUTOS ');
            return resultados;
        } catch (error) {
            console.log(error);
            return error;
        }

    },

    create: async (camposJson) => {
        try {
            const [resultados] = await pool.query("insert into PRODUTOS set ?", camposJson);
            return resultados;
        } catch (error) {
            console.log(error);
            return error;
        }


    },

    update: async (camposJson, id) => {
        try {
            const [resultados] = await pool.query("UPDATE PRODUTOS SET ? WHERE ID_PRODUTOS = ?", [camposJson, id])
            return resultados;
        } catch (error) {
            console.log(error);
            return error;
        }

    },

    delete: async (id) => {
        try {
            const [resultados] = await pool.query("UPDATE PRODUTOS SET STATUS_PRODUTOS = 0 WHERE ID_PRODUTO = ?", [id]);
            return resultados;
        } catch (error) {
            console.log(error);
            return error;
        }
    },
}

module.exports = { produtoModel };