const proffys = [
    { name: "Vinícius Marini", avatar: "https://avatars0.githubusercontent.com/u/57442852?v=4", whatsapp: "31999887744", bio: "Limpeza de qualidade e muita atenção. Sou profissional de limpeza há dez anos e já atendi mais de 2.000 casas!", subject: "Limpeza Completa", cost: "R$89.999", weekday: [0], time_from: [720], time_for: [1220] },

    { name: "Victor teste", avatar: "https://avatars1.githubusercontent.com/u/59877368?s=400&u=7ac037f2fa198a5abcea41cfaf46ed404c046f64&v=4", whatsapp: "31999887744", bio: "Limpeza de qualidade e muita atenção. Sou profissional de limpeza há dez anos e já atendi mais de 2.000 casas!", subject: "Limpeza de Apartamentos", cost: "R$89.999", weekday: [2], time_from: [700], time_for: [1220] },

    { name: "Arthur teste", avatar: "https://avatars1.githubusercontent.com/u/55153181?s=460&u=ee933c48a1851d7c6d59bc99d0a68ee019d10b95&v=4", whatsapp: "31999887744", bio: "Limpeza de qualidade e muita atenção. Sou profissional de limpeza há dez anos e já atendi mais de 2.000 casas!", subject: "Limpeza de Apartamentos", cost: "R$89.999", weekday: [2], time_from: [700], time_for: [1220] }
]

function pageLanding(req, res) {
    return res.render("index.html")
}

function pageStudy(req, res) {
    return res.render("study.html", { proffys })
}

function pageGiveClasses(req, res) {
    return res.render("give-classes.html")
}
const express = require('express')
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
    .get("/study", pageStudy)
    .get("/give-classes", pageGiveClasses)
    .listen(5500)