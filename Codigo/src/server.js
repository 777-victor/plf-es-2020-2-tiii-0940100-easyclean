const proffys = [{
        name: "Vinícius Marini",
        avatar: "https://avatars0.githubusercontent.com/u/57442852?v=4",
        whatsapp: "31999887744",
        bio: "Limpeza de qualidade e muita atenção. Sou profissional de limpeza há dez anos e já atendi mais de 2.000 casas!",
        subject: "Limpeza Completa",
        cost: "R$89.999",
        weekday: [0],
        time_from: [720],
        time_for: [1220]
    },

    { name: "Victor teste", avatar: "https://avatars1.githubusercontent.com/u/59877368?s=400&u=7ac037f2fa198a5abcea41cfaf46ed404c046f64&v=4", whatsapp: "31999887744", bio: "Limpeza de qualidade e muita atenção. Sou profissional de limpeza há dez anos e já atendi mais de 2.000 casas!", subject: "Limpeza de Apartamentos", cost: "R$89.999", weekday: [2], time_from: [700], time_for: [1220] },

    { name: "Arthur teste", avatar: "https://avatars1.githubusercontent.com/u/55153181?s=460&u=ee933c48a1851d7c6d59bc99d0a68ee019d10b95&v=4", whatsapp: "31999887744", bio: "Limpeza de qualidade e muita atenção. Sou profissional de limpeza há dez anos e já atendi mais de 2.000 casas!", subject: "Limpeza de Apartamentos", cost: "R$89.999", weekday: [2], time_from: [700], time_for: [1220] }
]

const weekdays = [

    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",

]

function pageLanding(req, res) {
    return res.render("index.html")
}

function pageFeedCliente(req, res) {
    return res.render("feedCliente.html", { proffys })
}

function pageCadastroServico(req, res) {
    return res.render("CadastrarServico.html")
}

function pageCadastro(req, res) {
    const data = req.query;

    const isNotEmpty = Object.keys(data).length > 0

    if (isNotEmpty) {
        console.log("entrei aqui");
        data.subject = getSubject(data.subject)

        proffys.push(data)

        return res.redirect("/study")
    }

    return res.render("Cadastro.html", { weekdays })
}
const express = require('express');
const { get } = require('http');
const server = express()

//nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('src/views/', {
    express: server,
    noCache: true,
})

//rotas da aplicação
server.use(express.static("public"))
    .get("/", pageLanding)
    .get("/feedCliente", pageFeedCliente)
    .get("/Cadastro", pageCadastro)
    .get("/CadastroServico", pageCadastroServico)
    .listen(5500)