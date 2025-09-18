const moment = require ("moment");
var pool = require("../config/pool_conexoes");

const favoritoModel = {
    findAll: async () => {
        try { 
            const [resultados] = await pool.query ("SELECT * FROM FAVORITOS");
            return resultados; 
        } catch (error) {
            console.log(error);
            return error;
        }
    }, 

    findId: async
}