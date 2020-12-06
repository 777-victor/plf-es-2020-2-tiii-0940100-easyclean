module.exports = async function(db, { disponibilidadeValor, classScheduleValues }) {


    //INSERIR DADOS NA TABELA ENDERECO

    const insertedDisponibilidade = await db.run(`
    INSERT INTO DISPONIBILIDADE (
        valor,
        descricao,
        diarista_id
    ) VALUES (
        "${disponibilidadeValor.valor}",
        "${disponibilidadeValor.bio}",
        "${disponibilidadeValor.idDiarista}"
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

    //AQUI VOU EXECUTAR TODOS OS DB.RUNS() DAS CLASS_SCHEDULES
    await Promise.all(insertedAllClassScheduleValues)

}