const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../database/vintelo.db');
const db = new sqlite3.Database(dbPath);


db.serialize(() => {
    
    db.run(`CREATE TABLE IF NOT EXISTS TIPO_USUARIO (
        ID_TIPO_USUARIO INTEGER PRIMARY KEY AUTOINCREMENT,
        TIPO_USUARIO VARCHAR(50) NOT NULL,
        DESCRICAO_USUARIO VARCHAR(255)
    )`);

    
    db.run(`INSERT OR IGNORE INTO TIPO_USUARIO (ID_TIPO_USUARIO, TIPO_USUARIO, DESCRICAO_USUARIO) VALUES 
        (1, 'admin', 'Administrador do sistema'),
        (2, 'cliente', 'Cliente da loja'),
        (3, 'brecho', 'Brecho/Vendedor')`);

    db.run(`CREATE TABLE IF NOT EXISTS USUARIOS (
        ID_USUARIO INTEGER PRIMARY KEY AUTOINCREMENT,
        NOME_USUARIO VARCHAR(255),
        USER_USUARIO VARCHAR(100),
        SENHA_USUARIO VARCHAR(255),
        EMAIL_USUARIO VARCHAR(255),
        CELULAR_USUARIO VARCHAR(20),
        TIPO_USUARIO INTEGER,
        STATUS_USUARIO INTEGER DEFAULT 1,
        NUMERO_USUARIO VARCHAR(20),
        CEP_USUARIO VARCHAR(10),
        IMAGEM_USUARIO VARCHAR(255),
        FOREIGN KEY (TIPO_USUARIO) REFERENCES TIPO_USUARIO(ID_TIPO_USUARIO)
    )`);
});

const pool = {
    query: (sql, params = []) => {
        return new Promise((resolve, reject) => {
            db.all(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve([rows]);
                }
            });
        });
    }
};

console.log("Conexão SQLite local estabelecida!");

module.exports = pool;