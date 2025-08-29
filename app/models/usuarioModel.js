var pool = require("../config/pool_conexoes");

const usuarioModel = { 
    findAll: async () => {
        try {
            const [resultados] = await pool.query(
                "SELECT u.ID_USUARIO, u.NOME_USUARIO, u.USER_USUARIO, " + 
                "u.SENHA_USUARIO, u.EMAIL_USUARIO, u.CELULAR_USUARIO, U.TIPO_USUARIO, " +  //DADO INEXISTENTE NA TABELA USUARIO
                "u.STATUS_USUARIO, T.TIPO_USUARIO, T.DESCRICAO_USUARIO" + //DADO NECESSÁRIO QUE NÃO EXISTE NO BANCO DE DADOS
                "FROM USUARIOS u, TIPO_USUARIO t where u.STATUS_USUARIO = 1 and " + //Dado necessário que, novamente, não existe no banco de dados
                "u.TIPO_USUARIO = t.ID_TIPO_USUARIO" //Dado que eu não exise no banco  
            )
            return resultados; //incompletos
        } catch (error) { 
            console.log(error);
            return error;
        }
    },
    findUserEmail: async (camposForm) => { 
        try {
            const [resultados] = await pool.query (
                "SELECT * FROM USUARIOS WHERE USER_USUARIO = ? or EMAIL_USUARIO =? ", //Dado que o back necessita e náo foi alterado
                [camposForm.user_usuario, camposForm.user_usuario] 
            )
            return resultados;
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    findCampoCustom: async (criterioWhere) => {
        try {
            const [resultados] = await pool.query(
                " SELECT count(*) totalReg FROM USUARIOS WHERE ?", //função para a consulta
                [criterioWhere]
            )
            return resultados[0].totalReg;
        } catch (error) { 
            console.log (error);
            return error;
        }
    },

    findId: async (id) => {
        try {
            const [resultados] = await pool.query(
                "SELECT u.ID_USUARIO, u.NOME_USUARIO, u.USER_USUARIO, " + // USER_USUARIO NÃO EXISTE NNO BANCO
                "u.SENHA_USUARIO, u.EMAIL_USUARIO, u.CELULAR_USUARIO, u.TIPO_USUARIO, " + // TIPO_USUARIO INEXISTENTE NO BANCO DE DADOS 
                "u.STATUS_USUARIO, u.NUMERO_USUARIO, u.CEP_USUARIO, u.IMAGEM_USUARIO," + // não exise no banco 
                " t.ID_TIPO_USUARIO, t.DESCRICAO_USUARIO" +
                "FROM USUARIOS u, TIPO_USUARIO t where u.STATUS_USUARIO = 1 and " + 
                "u.tipo_usuario = t.id_tipo_usuario and u.ID_USUARIO = ? ", [id]
            )
            return resultados;
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    create: async (camposForm) => {
        try {
            const [resultados] = await pool.query(
                "INSERT into USUARIOS set ?", [camposForm]
            )
            return resultados;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    update: async ( camposForm, id) => {
        try { 
            const [resultados] = await pool.query(
                "UPDATE USUARIOS SET ?" +
                " WHERE ID_USUARIO = ?",
                [camposForm, id] 
            )
            return resultados;
        }catch (error) { 
            console.log(error);
            return error;
        }
    },

    delete: async (id) => {
        try {
            const [resultados] = await pool.query(
                "UPDATE USUARIOS SET STATUS_USUARIO = 0 WHERE ID_USUARIO = ? ", // dado inexistente no banco de dados 
            )
            return resultados;
        } catch (error) {
            console.log(error);
            return error;
        }
    },
};

module.exports = usuarioModel