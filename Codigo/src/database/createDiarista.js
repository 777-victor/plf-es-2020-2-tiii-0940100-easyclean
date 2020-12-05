module.exports = async function(db, { cadastroValor, logadrouroValor }) {


    //INSERIR DADOS NA TABELA ENDERECO
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
        //INSERIR DADOS NA TABELA DE EMPREGADAS
    const insertedDiarista = await db.run(`
    INSERT INTO DIARISTA (
        nome,
        cpf,
        img_diarista,
        telefone,
        email,
        logradouro_id,
        senha
    ) VALUES (
        "${cadastroValor.name}",
        "${cadastroValor.cpf}",
        "${cadastroValor.avatar}",
        "${cadastroValor.whatsapp}",
        "${cadastroValor.email}",
        "${logradouro_id}",
        "${cadastroValor.password}"
    );
    `)

    const insertUsers = await db.run(`
        INSERT INTO USERS(
            emailuser,
            senhauser
        ) VALUES (
            "${cadastroValor.email}",
            "${cadastroValor.password}"
        );

        `)

    //AQUI VOU EXECUTAR TODOS OS DB.RUNS() DAS CLASS_SCHEDULES
    await Promise.all()

}