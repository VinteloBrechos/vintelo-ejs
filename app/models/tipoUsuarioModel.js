var pool = require("../config/pool_conexoes");
const { findAll } = require("./usuarioModel");

const tipoUsuarioModel = {
    findAll: async () => {
        try {
            const [resultados] = await pool.query(
                'SELECT * FROM tipo_usuario'
          )
        }
    }
}

//preciso da alterações do banco