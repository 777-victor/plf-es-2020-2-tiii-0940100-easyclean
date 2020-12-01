//SERVIDOR
const express = require('express')
const server = express()

const {
    pageLanding,
    pageStudy,
    pageCadastro,
    pageCadastroServico,
    saveCadastro,
    loginUsuario
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
    .get("/feedCliente", pageStudy)
    .get("/Cadastro", pageCadastro)
    .get("/CadastroServico", pageCadastroServico)
    .post("/save-cadastro", saveCadastro)
    .post("/login", loginUsuario)
    .listen(5500)