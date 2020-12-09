module.exports = async function(db, { dados }) {
    //INSERIR DADOS NA TABELA DE EMPREGADAS


    const insertedContrato = await db.run(`
    INSERT INTO CONTRATO (
        VALOR,
        CLIENTE_ID,
        DIARISTA_ID,
        DISPONIBILIDADE_ID
    ) VALUES (
        "${dados.valor}",
        "${dados.clienteId}",
        "${dados.diaristaId}",
        "${dados.disponibilidadeId}"
    );
`)



    //INSERIR DADOS NA TABELA ENDERECO

    //await Promise.all(insertedDiarista)
}