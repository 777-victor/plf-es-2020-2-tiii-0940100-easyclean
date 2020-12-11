const { filter } = require('async')
const db = require('./database/db')
const Database = require('./database/db')

const { weekdays, convertHoursToMinutes, convertMinutesToHours } = require('./utils/format')

//FUNCIONALIDADES
function pageLanding(req, res) {
    return res.render("index.html")
}

async function pageIndicadores(req, res) {
    const indicador1 = 
    `SELECT round
        (SUM(VALOR)/COUNT(ID)) AS VALORMEDIO
    FROM DISPONIBILIDADE
    `
    const indicador2=
    `
    SELECT
        COUNT(ID) AS DIARISTASMENSAIS
    FROM DIARISTA
    WHERE DATA_CADASTRO BETWEEN '2020-12-01 00:00:00' AND '2020-12-31 23:59:59'
    `
    const indicador3=
    `
    SELECT 
        ( COUNT(PAGAMENTO.ID)/COUNT(CONTRATO.ID) )*100 AS TOTAL
        FROM PAGAMENTO, CONTRATO
    `

    const indicador4=
    `
    SELECT ROUND
        (SUM(VALOR)/COUNT(ID)) AS TICKETMEDIO
    FROM CONTRATO
    
    `
    const indicador5=
    `
    SELECT
        COUNT(CPF) AS TOTAL, 0+(SELECT COUNT(ID)FROM CONTRATO)AS ATIVAS
    FROM DIARISTA
    `
    try {
        const db = await Database
        const indica1 = await db.all(indicador1)
        const indica2 = await db.all(indicador2)
        const indica3 = await db.all(indicador3)
        const indica4 = await db.all(indicador4)
        const indica5 = await db.all(indicador5)
        return res.render("indicadores.html", { indica1 ,indica2 ,indica3, indica4,indica5 })
    } catch (error) {
        console.log(error)
    }

}

async function pagefeedDiarista(req, res) {

    const filters = req.query

    console.log("Cliente 2, Diarista 1: " + filters.youAre);
    console.log("ID: " + filters.id);

    //filtro diarista
    if (filters.youAre == 1) {
        const query = `
    SELECT DISPONIBILIDADE.*, DIARISTA.*, HORARIOS.*, CONTRATO.*, CLIENTE.NOME AS NOMECLIENTE, CLIENTE.IMG_CLIENTE
    FROM DIARISTA
    JOIN CONTRATO ON (CONTRATO.DIARISTA_ID = DIARISTA.ID)
    JOIN DISPONIBILIDADE ON (DISPONIBILIDADE.DIARISTA_ID = DIARISTA.ID)
    JOIN HORARIOS ON (HORARIOS.DISPONIBILIDADE_ID = DISPONIBILIDADE.ID)
    JOIN CLIENTE ON (CLIENTE.ID = CONTRATO.CLIENTE_ID)
    WHERE DIARISTA.ID = ${filters.id}
    `

        try {
            const db = await Database

            const ContratoDiarista = await db.all(query)

            console.log(ContratoDiarista)

            return res.render('feedDiarista.html', { ContratoDiarista, filters })
                //return res.render('feedCliente.html')
        } catch (error) {
            console.log(error)
        }

    } else if (filters.youAre == 2) {

        console.log("Cliente 2, Diarista 1: " + filters.youAre);
        console.log("ID: " + filters.id);

        //filtro diarista

        const query = `
        SELECT DISPONIBILIDADE.*, DIARISTA.*, HORARIOS.*, CONTRATO.*, CLIENTE.NOME AS NOMECLIENTE, CLIENTE.IMG_CLIENTE
        FROM DIARISTA
        JOIN CONTRATO ON (CONTRATO.DIARISTA_ID = DIARISTA.ID)
        JOIN DISPONIBILIDADE ON (DISPONIBILIDADE.DIARISTA_ID = DIARISTA.ID)
        JOIN HORARIOS ON (HORARIOS.DISPONIBILIDADE_ID = DISPONIBILIDADE.ID)
        JOIN CLIENTE ON (CLIENTE.ID = CONTRATO.CLIENTE_ID)
        WHERE CLIENTE.ID = ${filters.id}
        `

        try {
            const db = await Database

            const ContratoDiarista = await db.all(query)

            console.log(ContratoDiarista)

            return res.render('feedDiarista.html', { ContratoDiarista, filters })
                //return res.render('feedCliente.html')
        } catch (error) {
            console.log(error)
        }

        return res.render('feedDiarista.html', { ContratoDiarista, filters })
    }

    return res.render('feedDiarista.html');

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

    const queryIdCliente = `SELECT MAX(id), NOME FROM CLIENTE`

    //CASO HAJA ERRO NA HORA DA CONSULTA DO BANCO DE DADOS
    try {
        const db = await Database

        const Servicos = await db.all(query)

        const ClienteObject = await db.all(queryIdCliente)

        const Cliente = Object.values(ClienteObject[0]);

        //const split = convertMinutesToHours(Servicos[0].tempo_de, 2);

        //console.log(split);
        console.log("Id cliente " + Cliente)

        console.log(Servicos)

        return res.render('feedCliente.html', { Servicos, filters, weekdays, Cliente })
            //return res.render('feedCliente.html')
    } catch (error) {
        console.log(error)
    }
}

//data-toggle="modal" data-target="#exampleModal"

function pageCadastro(req, res) {
    //SE NÃO, MOSTRAR A PÁGINA


    return res.render("Cadastro.html", { weekdays })
}

function pageLogin(req, res) {
    return res.render("login.ejs")
}



async function pageServico(req, res) {

    let query = ` SELECT MAX(id) FROM DIARISTA`

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

async function saveContrato(req, res) {
    console.log("Entrou no saveContrato");

    const filters = req.query

   console.log(filters.pagamento);
    const dados = {
        disponibilidadeId: req.body.idServico,
        diaristaId: req.body.idDiarista,
        clienteId: req.body.idCliente,
        valor: req.body.valorDiarista,
        pagamento: req.body.pagamento
    }

    console.log(dados);

    const cadastraContrato = require('./database/createContrato')

    try {
        const db = await Database
        await cadastraContrato(db, { dados })
            //return res.redirect("/feedCliente" + queryString)
        return res.redirect("/feedCliente")
    } catch (error) {
        console.log(error)
    }




    return res.render("CadastrarServico.html")
}

async function updateContrato(req, res) {
    console.log("Entrou no updateContrato");
    const filters = req.query

    const dados = {
        contratoId: req.body.idContrato,
        disponibilidadeId: req.body.idServico,
        diaristaId: req.body.idDiarista,
        clienteId: req.body.idCliente,
        valor: req.body.valorServico,
        notaCliente: req.body.notaCliente,
        notaDiarista: req.body.notaDiarista
    }
    console.log("DADOS: " + dados.valor);

    const cadastraContrato = require('./database/updateContrato')

    try {
        const db = await Database
        await cadastraContrato(db, { dados })
            //return res.redirect("/feedCliente" + queryString)
        return res.render('feedDiarista.html', { filters })
    } catch (error) {
        console.log(error)
    }

    //return res.render("CadastrarServico.html")

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
    pagefeedDiarista,
    pageIndicadores,
    pageCadastro,
    pageServico,
    pageLogin,
    saveServivo,
    saveContrato,
    saveCadastro,
    updateContrato
}