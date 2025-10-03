const moment = require("moment");
var pool = require("../config/pool_conexoes");

const produtoModel = {
    findAll: async (id = null) => {
        try {
            const [resultados] = await pool.query("SELECT h.ID_PRODUTO, h.NOME_PRODUTO, h.PRECO_PRODUTO, h.STATUS_PRODUTO, IF(f.PRODUTOS_ID_PRODUTO > 0, 'favorito', 'favoritar') as FAVORITOS FROM PRODUTOS h  left join FAVORITOS f on ((h.ID_PRODUTO = f.PRODUTOS_ID_PRODUTO and f.ID_USUARIO = NULL) )", [id]);
                return resultados;
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    findID: async (id) => {
        try {
            const [resultados] = await pool.query("SELECT * FROM PRODUTOS where ID_PROD = ? ", [id]);
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
            const [resultados] = await pool.query("UPDATE PRODUTOS SET ? WHERE ID_PROD = ?", [camposJson, id])
            return resultados;
        } catch (error) {
            console.log(error);
            return error;
        }

    },

    delete: async (id) => {
        try {
            const [resultados] = await pool.query("UPDATE PRODUTOS SET STATUS_PRODUTOS = 0 WHERE ID_PROD = ?", [id]);
            return resultados;
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    findRecent: async (limit = 8) => {
        try {
            const [resultados] = await pool.query(
                `SELECT p.PRODUTO_ID_PRODUTO as ID_PRODUTO, p.NOME_PRODUTO, p.PRECO_PRODUTO, 
                 p.TIPO_PRODUTO, p.TAMANHO_PRODUTO, p.COR_PRODUTO, p.CONDICAO_PRODUTO,
                 i.URL_IMG, u.NOME_USUARIO as VENDEDOR
                 FROM PRODUTOS p 
                 LEFT JOIN IMG_PRODUTOS i ON p.PRODUTO_ID_PRODUTO = i.PRODUTO_ID_PRODUTO
                 LEFT JOIN USUARIOS u ON p.ID_USUARIO = u.ID_USUARIO
                 WHERE p.STATUS_PRODUTO = 'disponivel'
                 GROUP BY p.PRODUTO_ID_PRODUTO
                 ORDER BY p.DATA_CADASTRO DESC 
                 LIMIT ?`, 
                [limit]
            );
            return resultados;
        } catch (error) {
            console.log(error);
            return [];
        }
    },
}

module.exports = { produtoModel };