const Database = require('sqlite-async')
    //DataBase.open(__dirname + '/database.sqlite').then(execute)

function execute(db) {
    //criando as tabelas do banco de dados
    return db.exec(`
 
    CREATE TABLE IF NOT EXISTS DIARISTA 
    (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      CPF TEXT,
      NOME TEXT, 
      DATA_CADASTRO datetime default current_timestamp,
      EMAIL TEXT,
      IMG_DIARISTA TEXT,
      TELEFONE TEXT,
      LOGRADOURO_ID INTEGER

    );
    

    CREATE TABLE IF NOT EXISTS DISPONIBILIDADE
    (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      VALOR TEXT,
      DESCRICAO TEXT,
      DIARISTA_ID INTEGER
    );

    CREATE TABLE IF NOT EXISTS HORARIOS(

        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        DIA_SEMANA INTEGER,
        TEMPO_DE INTEGER,
        TEMPO_ATE INTEGER,
        DISPONIBILIDADE_ID INTEGER

    );

    CREATE TABLE IF NOT EXISTS CLIENTE 
    
    (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      CPF TEXT,
      NOME TEXT,
      EMAIL TEXT,
      IMG_CLIENTE TEXT,
      TELEFONE TEXT,
      LOGRADOURO_ID INTEGER

    );

    CREATE TABLE IF NOT EXISTS LOGRADOURO 
    (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        CEP TEXT,
        RUA TEXT,
        BAIRRO TEXT,
        CIDADE TEXT,
        ESTADO TEXT

    );
    
    
    CREATE TABLE IF NOT EXISTS CONTRATO(

     ID INTEGER PRIMARY KEY AUTOINCREMENT,
     NOTA_CLIENTE INTEGER,
     NOTA_DIARISTA INTEGER,
     VALOR INTEGER, 
     CLIENTE_ID INTEGER,
     DIARISTA_ID INTEGER,
     DISPONIBILIDADE_ID INTEGER
    
    );
    
    `)
}

module.exports = Database.open(__dirname + '/database.sqlite').then(execute)