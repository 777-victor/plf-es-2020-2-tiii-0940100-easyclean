//SERVIDOR
const express = require('express')
const server = express()

const {
    pageLanding,
    pagefeedCliente,
    pageCadastro,
    saveCadastro,
    pageCadastrarServico
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
    .get("/CadastrarServico", pageCadastrarServico)
    .post("/save-cadastro", saveCadastro)
    .listen(5500)





















//LOGIN
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('./passport-config')
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

const users = []

server.use(express.static(__dirname + "/public"))
server.set('view-engine', 'ejs')
server.use(express.urlencoded({ extended: false }))
server.use(flash())
server.use(session({
    secret: 'somevalue',
    resave: false,
    saveUninitialized: false
}))
server.use(passport.initialize())
server.use(passport.session())
server.use(methodOverride('_method'))

server.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

server.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

server.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

server.post('/register', checkNotAuthenticated, async(req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
})

server.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}