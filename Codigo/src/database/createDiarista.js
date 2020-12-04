module.exports = async function(db, { cadastroValor, logadrouroValor, disponibilidadeValor, classScheduleValues }) {


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

    const diarista_id = insertedDiarista.lastID;

    const insertedDisponibilidade = await db.run(`
    INSERT INTO DISPONIBILIDADE (
        valor,
        descricao,
        diarista_id
    ) VALUES (
        "${disponibilidadeValor.valor}",
        "${disponibilidadeValor.bio}",
        "${diarista_id}"
    );
    `)
    const disponibilidade_id = insertedDisponibilidade.lastID;

    const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => {
        return db.run(`
           INSERT INTO HORARIOS (
             dia_semana,
             tempo_de,
             tempo_ate,
             disponibilidade_id
           ) VALUES (
            "${classScheduleValue.weekday}",
            "${classScheduleValue.time_from}",
            "${classScheduleValue.time_to}",
            "${disponibilidade_id}"
           );   
        `)
    })

    const insertUsers= await db.run(`
        INSERT INTO USERS(
            email,
            senha
        ) VALUES (
            "${cadastroValor.email}",
            "${cadastroValor.password}"
        );

        `)
        
    //AQUI VOU EXECUTAR TODOS OS DB.RUNS() DAS CLASS_SCHEDULES
    await Promise.all(insertedAllClassScheduleValues)

}