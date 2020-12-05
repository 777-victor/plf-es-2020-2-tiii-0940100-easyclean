module.exports = async function(db, { cadastroValor, logadrouroValor }) {
    //INSERIR DADOS NA TABELA DE EMPREGADAS


    const insertedLogradouro = await db.run(`
    INSERT INTO LOGRADOURO (
        cep,
        rua,
        bairro,
        estado,
        cidade
    ) VALUES (
        "${logadrouroValor.cep}",
        "${logadrouroValor.rua}",
        "${logadrouroValor.bairro}",
        "${logadrouroValor.estado}",
        "${logadrouroValor.cidade}"
    );
`)

    const logradouro_id = insertedLogradouro.lastID

    const insertedCliente = await db.run(`
        INSERT INTO CLIENTE (
            nome,
            cpf,
            img_cliente,
            telefone,
            email,
            logradouro_id
        ) VALUES (
            "${cadastroValor.name}",
            "${cadastroValor.cpf}",
            "${cadastroValor.avatar}",
            "${cadastroValor.whatsapp}",
            "${cadastroValor.email}",
            "${logradouro_id}"
        );
    `)





    //INSERIR DADOS NA TABELA ENDERECO

    //await Promise.all(insertedDiarista)
}