const db = require('./database/db')
const Database = require('./database/db')

const { weekdays, convertHoursToMinutes } = require('./utils/format')

//FUNCIONALIDADES
function pageLanding(req, res) {
    return res.render("index.html")
}

async function pageStudy(req, res) {
    const filters = req.query


    if (!filters.weekday || !filters.time) {
        //return res.render("feedCliente.html", { filters, weekdays })
        return res.render('feedCliente.html', { filters, weekdays })
    }

    //CONVERTER HORAS EM MINUTOS
    const timeToMinutes = convertHoursToMinutes(filters.time)

    // console.log(filters.weekday)
    console.log(timeToMinutes);

    const query = `
    SELECT DISPONIBILIDADE.*, DIARISTA.*
    FROM DIARISTA
    JOIN DISPONIBILIDADE ON (DISPONIBILIDADE.DIARISTA_ID = DIARISTA.ID)
    WHERE EXISTS(
      SELECT HORARIOS.*
      FROM HORARIOS
      WHERE HORARIOS.DISPONIBILIDADE_ID = DISPONIBILIDADE.ID
      AND HORARIOS.DIA_SEMANA = ${filters.weekday}
      AND HORARIOS.TEMPO_DE >= ${timeToMinutes}
    )
    `
        //CASO HAJA ERRO NA HORA DA CONSULTA DO BANCO DE DADOS
    try {
        const db = await Database

        const Servicos = await db.all(query)
        console.log(Servicos)

        return res.render('feedCliente.html', { Servicos, filters, weekdays })
            //return res.render('feedCliente.html')
    } catch (error) {
        console.log(error)
    }
}

function pageCadastro(req, res) {
    //SE NÃO, MOSTRAR A PÁGINA

    return res.render("Cadastro.html", { weekdays })
}

async function saveCadastro(req, res) {
    const cadastraDiarista = require('./database/createDiarista')
    const cadastraCliente = require('./database/createCliente')

    const cadastroValor = {
        name: req.body.name,
        cpf: req.body.cpf,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        email: req.body.email,
        youAre: req.body.youAre
    }

    const logadrouroValor = {
        cep: req.body.cep,
        rua: req.body.rua,
        bairro: req.body.bairro,
        cidade: req.body.cidade,
        estado: req.body.uf
    }

    const disponibilidadeValor = {
        valor: req.body.valor,
        bio: req.body.descricao
    }



    const classScheduleValues = req.body.weekday.map((weekday, index) => {
            return {
                weekday,
                time_from: convertHoursToMinutes(req.body.time_from[index]),
                time_to: convertHoursToMinutes(req.body.time_to[index])
            }
        })
        //console.log("TESTE");
        //console.log(weekday);
        //console.log(convertHoursToMinutes(req.body.time_from[0]));
        //console.log(convertHoursToMinutes(req.body.time_to[0]));
    if (cadastroValor.youAre == 1) {

        try {
            const db = await Database
            await cadastraDiarista(db, { cadastroValor, logadrouroValor, disponibilidadeValor, classScheduleValues })

            let queryString = "?weekday=" + req.body.weekday[0]
            queryString = "?time=" + req.body.time_from[0]

            //return res.redirect("/feedCliente" + queryString)
            return res.redirect("/feedCliente")
        } catch (error) {
            console.log(error)
        }
    } else if (cadastroValor.youAre == 2) {
        try {
            const db = await Database
            await cadastraCliente(db, { cadastroValor, logadrouroValor })
                //return res.redirect("/feedCliente" + queryString)
            return res.redirect("/feedCliente")
        } catch (error) {
            console.log(error)
        }

    }

}

module.exports = {
    pageLanding,
    pageStudy,
    pageCadastro,
    saveCadastro
}