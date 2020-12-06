//SERVIDOR
const express = require('express')
const server = express()

const {
    pageLanding,
    pagefeedCliente,
    pageCadastro,
    saveCadastro,
    pageServico,
    pageLogin,
    saveServivo
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
    .get("/login", pageLogin)
    .get("/CadastrarServico", pageServico)

.post("/save-cadastro", saveCadastro)
    .post("/save-servico", saveServivo)

.listen(5500)