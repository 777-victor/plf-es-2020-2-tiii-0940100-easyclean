//SERVIDOR
const express = require('express')
const server = express()

const {
    pageLanding,
    pagefeedCliente,
    pageCadastro,
    saveCadastro
} = require('./pages')

//nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('src/views/', {
    express: server,
    noCache: true,
})

//INICIO E CONFIGURAÇÃO DO SERVIDOR
server
//RECEBER OS DADOS DO REQ.BODY
    .use(express.urlencoded({ extended: true }))
    //rotas da aplicação
server.use(express.static("public"))
    .get("/", pageLanding)
    .get("/feedCliente", pagefeedCliente)
    .get("/Cadastro", pageCadastro)
    .post("/save-cadastro", saveCadastro)
    .listen(5500)