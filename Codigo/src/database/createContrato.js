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

        const contrato_id = insertedContrato.lastID

        console.log("pagamento 1 para sim: " + dados.pagamento);
            if(dados.pagamento == 1 ){
            const insertedPagamento = await db.run(`
            INSERT INTO PAGAMENTO (
                VALOR,
                CONTRATO_ID,
                FORMA_PAGAMENTO
            ) VALUES (
                "${dados.valor}",
                "${contrato_id}",
                "CARTÃO DE CRÉDITO"
            );
            `)
        }

    //INSERIR DADOS NA TABELA ENDERECO

    //await Promise.all(insertedDiarista)
}