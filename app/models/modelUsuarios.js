var pool = require("../../config/pool_conexoes");
 
    const modelUsuarios = {
        findAll: async () => {
            try {
                const [resultados] = await pool.query(
                    "SELECT u.id_usuario, u.nome_usuario, u.user_usuario, " +
                    "u.senha_usuario, u.email_usuario, u.fone_usuario from USUARIOS"
                )
                return resultados;
            } catch (error) {
                console.log(error);
                return error;  
            }
        },
 
        findUserEmail: async (camposForm) => {
            try {
                const [resultados] = await pool.query(
                    "SELECT * FROM VINTELO WHERE USUARIOS = ? or email_usuario = ?",
                    [camposForm.user_usuario, camposForm.user_usuario] /* ACHAR O CAMINHO COM O FRONT*/
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
                    "SELECT count(*) totalReg FROM USUARIOS WHERE ?",
                    [criterioWhere]
                )
                return resultados[0].totalReg;
            } catch (error) {
                console.log(error);
                return error;
            }
        },
 
        findId: async (id) => {
            try {
                const [resultados] = await pool.query(
                    "SELECT u.id_usuario, u.nome_usuario, u.user_usuario, " +
                    "u.senha_usuario, u.email_usuario, u.fone_usuario, u.tipo_usuario, " +
    [id]
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
                    "insert into USUARIOS set ?", [camposForm]
                )
                return resultados;
            } catch (error) {
                console.log(error);
                return null;
            }
        },
 
        update: async (camposForm, id) => {
            try {
                const [resultados] = await pool.query(
                    "UPDATE USUARIOS SET ? " +
                    " WHERE ID_USUARO = ?",
                    [camposForm, id]
                )
                return resultados;
            } catch (error) {
                console.log(error);
                return error;
            }
        },
 
        delete: async (id) => {
            try {
                const [resultados] = await pool.query(
                    "UPDATE USUARIOS SET status_usuario = 0 WHERE ID_USUARIO = ? ", [id]
                )
                return resultados;
            } catch (error) {
                console.log(error);
                return error;
            }
        },
    };
 
    module.exports = modelUsuarios