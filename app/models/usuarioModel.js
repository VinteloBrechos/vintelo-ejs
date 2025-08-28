var pool = require("../config/pool_conexoes");

const usuarioModel = { 
    findAll: async () => {
        try {
            const [resultados] = await pool.query(
                "SELECT u.ID_USUARIO, u.NOME_USUARIO, u.USER_USUARIO, " + 
                "u.SENHA_USUARII, u.EMAIL_USUARIO, u.CELULAR_USUARIO"
            )
        }
    }
}