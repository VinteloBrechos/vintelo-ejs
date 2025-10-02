var pool = require("../config/pool_conexoes");

const categoriaModel = {
    findAll: async () => {
        try {
            const [resultados] = await pool.execute(
                'SELECT * FROM CATEGORIAS_PRODUTOS ORDER BY NOME_CATEGORIA_PROD'
            );
            return resultados || [];
        } catch (error) {
            console.log('Erro ao buscar categorias:', error);
            return [];
        }
    },

    findById: async (id) => {
        try {
            const [resultados] = await pool.execute(
                'SELECT * FROM CATEGORIAS_PRODUTOS WHERE ID_CATEGORIA_PROD = ?',
                [id]
            );
            return resultados;
        } catch (error) {
            return error;
        }
    },

    findProductsByCategory: async (categoryId, filters = {}) => {
        try {
            let query = `
                SELECT DISTINCT p.*, u.NOME_USUARIO, img.URL_IMG
                FROM PRODUTOS p
                INNER JOIN PRODUTOS_CATEGORIAS pc ON p.ID_PROD = pc.ID_PROD
                INNER JOIN USUARIOS u ON p.ID_USUARIO = u.ID_USUARIO
                LEFT JOIN IMG_PRODUTOS img ON p.ID_PROD = img.ID_PROD
                WHERE pc.ID_CATEGORIA_PROD = ?
            `;
            
            let params = [categoryId];
            
            if (filters.tamanho) {
                query += ' AND p.TAMANHO = ?';
                params.push(filters.tamanho);
            }
            
            if (filters.cor) {
                query += ' AND p.COR_PRODUTO LIKE ?';
                params.push(`%${filters.cor}%`);
            }
            
            if (filters.condicao) {
                query += ' AND p.CONDICAO = ?';
                params.push(filters.condicao);
            }
            
            if (filters.precoMin) {
                query += ' AND p.PRECO_PRODUTO >= ?';
                params.push(filters.precoMin);
            }
            
            if (filters.precoMax) {
                query += ' AND p.PRECO_PRODUTO <= ?';
                params.push(filters.precoMax);
            }
            
            query += ' ORDER BY p.DATA_CADASTRO DESC';
            
            const [resultados] = await pool.execute(query, params);
            return resultados;
        } catch (error) {
            return error;
        }
    },

    getFilters: async () => {
        try {
            const [tamanhos] = await pool.execute(
                'SELECT DISTINCT TAMANHO FROM PRODUTOS WHERE TAMANHO IS NOT NULL ORDER BY TAMANHO'
            );
            
            const [cores] = await pool.execute(
                'SELECT DISTINCT COR_PRODUTO FROM PRODUTOS ORDER BY COR_PRODUTO'
            );
            
            const [condicoes] = await pool.execute(
                'SELECT DISTINCT CONDICAO FROM PRODUTOS ORDER BY CONDICAO'
            );
            
            return {
                tamanhos: (tamanhos || []).map(t => t.TAMANHO),
                cores: (cores || []).map(c => c.COR_PRODUTO),
                condicoes: (condicoes || []).map(c => c.CONDICAO)
            };
        } catch (error) {
            console.log('Erro ao buscar filtros:', error);
            return {
                tamanhos: [],
                cores: [],
                condicoes: []
            };
        }
    }
};

module.exports = categoriaModel;