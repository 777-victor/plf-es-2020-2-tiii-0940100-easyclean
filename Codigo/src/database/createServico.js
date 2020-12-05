module.exports = async function(db, { cadastroValor, disponibilidadeValor, classScheduleValues }) {

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