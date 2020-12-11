//SERVIDOR
const express = require('express')
const server = express()

const {
    pageLanding,
    pagefeedCliente,
    pagefeedDiarista,
    pageCadastro,
    saveCadastro,
    pageServico,
    pageLogin,
    saveServivo,
    pageIndicadores,
    saveContrato,
    updateContrato
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
    .get("/feedDiarista", pagefeedDiarista)
    .get("/Cadastro", pageCadastro)
    .get("/login", pageLogin)
    .get("/CadastrarServico", pageServico)
    .get("/Indicadores", pageIndicadores)
    .post("/save-cadastro", saveCadastro)
    .post("/save-servico", saveServivo)
    .post("/save-contrato", saveContrato)
    .post("/update-contrato", updateContrato)

.listen(5500)