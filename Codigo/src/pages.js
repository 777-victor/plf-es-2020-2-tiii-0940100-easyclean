const db = require('./database/db')
const Database = require('./database/db')

const { weekdays, convertHoursToMinutes } = require('./utils/format')

//FUNCIONALIDADES
function pageLanding(req, res) {
    return res.render("index.html")
}

async function pagefeedCliente(req, res) {
    const filters = req.query

    if (!filters.weekday || (!filters.tempo_de || !filters.tempo_ate)) {
        //return res.render("feedCliente.html", { filters, weekdays })
        return res.render('feedCliente.html', { filters, weekdays })
    }

    //CONVERTER HORAS EM MINUTOS
    const tempo_de = convertHoursToMinutes(filters.tempo_de)
    const tempo_ate = convertHoursToMinutes(filters.tempo_ate)

    console.log(filters.weekday)
        //filters.weekday = 1;
    console.log(tempo_de);
    console.log(tempo_ate);

    const query = `
    SELECT DISPONIBILIDADE.*, DIARISTA.*, HORARIOS.*
    FROM DIARISTA
    JOIN DISPONIBILIDADE ON (DISPONIBILIDADE.DIARISTA_ID = DIARISTA.ID)
    JOIN HORARIOS ON (HORARIOS.DISPONIBILIDADE_ID = DISPONIBILIDADE.ID)
    WHERE EXISTS(
      SELECT HORARIOS.*
      FROM HORARIOS
      WHERE HORARIOS.DISPONIBILIDADE_ID = DISPONIBILIDADE.ID
      AND HORARIOS.DIA_SEMANA = ${filters.weekday}
      AND HORARIOS.TEMPO_DE >= ${tempo_de}
      AND HORARIOS.TEMPO_ATE <= ${tempo_ate}
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

function pageLogin(req, res) {
    return res.render("login.ejs")
}

async function pageServico(req, res) {

    let query = `
            SELECT MAX(id) FROM DIARISTA`

    try {
        const db = await Database
        const idDiarista = await db.all(query)
            //console.log(idDiarista)
            //idDiarista = JSON.stringify(idDiarista)
        const id = Object.values(idDiarista[0]);
        console.log(id);
        return res.render("CadastrarServico.html", { id, weekdays })
    } catch (error) {
        console.log(error)
    }

    return res.render("CadastrarServico.html", { id, weekdays })
}

async function saveServivo(req, res) {
    console.log("Entrou no saveServico")

    const cadastraServico = require('./database/createServico')
    const disponibilidadeValor = {
        idDiarista: req.body.idDiarista,
        valor: req.body.Valor,
        bio: req.body.Descricao
    }


    const classScheduleValues = req.body.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })

    try {
        const db = await Database
        await cadastraServico(db, { disponibilidadeValor, classScheduleValues })

        let queryString = "?weekday=" + req.body.weekday[0]
        queryString = "?time=" + req.body.time_from[0]

        //return res.redirect("/feedCliente" + queryString)
        return res.redirect("/feedCliente")
    } catch (error) {
        console.log(error)
    }

    return res.render("CadastrarServico.html")
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
        youAre: req.body.youAre,
        password: req.body.password
    }

    const logadrouroValor = {
            cep: req.body.cep,
            rua: req.body.rua,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            estado: req.body.uf
        }
        //console.log("TESTE");
        //console.log(weekday);
        //console.log(convertHoursToMinutes(req.body.time_from[0]));
        //console.log(convertHoursToMinutes(req.body.time_to[0]));
    if (cadastroValor.youAre == 1) {

        try {
            const db = await Database
            await cadastraDiarista(db, { cadastroValor, logadrouroValor })

            return res.redirect("/CadastrarServico")
                //pageServico(req, res, id);
                //return res.render("CadastrarServico.html", { id, weekdays })

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
    pageLogin,
    pagefeedCliente,
    pageCadastro,
    pageServico,
    pageLogin,


    saveServivo,
    saveCadastro
}