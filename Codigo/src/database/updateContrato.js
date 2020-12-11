module.exports = async function(db, { dados }) {
    //INSERIR DADOS NA TABELA DE EMPREGADAS


    const updateContrato = await db.run(`
    UPDATE CONTRATO 
    SET VALOR = "${dados.valor}",
    NOTA_CLIENTE = "${dados.notaCliente}",
    NOTA_DIARISTA = "${dados.notaDiarista}"
    
    WHERE CONTRATO.ID = "${dados.contratoId}"

`)



    //INSERIR DADOS NA TABELA ENDERECO

    //await Promise.all(insertedDiarista)
}