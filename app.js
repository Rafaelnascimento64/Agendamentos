const express = require('express')
const app = express()
const handlebars = require('express-handlebars').engine
const bodyParser = require('body-parser')
const post = require('./models/post')

app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/cadastrar', function (req, res) {
  post
    .create({
      nome: req.body.nome,
      telefone: req.body.telefone,
      origem: req.body.origem,
      data_contato: req.body.dataContato,
      observacao: req.body.observacao
    })
    .then(function () {
      console.log('Dados cadastrados com sucesso!')
      res.send('Dados cadastrados com sucesso!')
    })
    .catch(function (err) {
      console.log('Erro ao cadastrar dados na entidade: ' + err)
    })
})

app.get('/consultar', function(req, res) {
  post.findAll().then(function(posts) {
    res.render("consultar", {posts})
    console.log(posts)
  })
})

app.get('/editar/:id', function(req, res) {
  post.findAll({ where: { 'id': req.params.id }})
  .then(function(posts) {
    res.render('editar', {posts})
    console.log(posts)
  })
})

app.get('/excluir/:id', function(req, res) {
  post.findAll({ where: { 'id': req.params.id }})
  .then(function(posts) {
    res.render('excluir', {posts})
    console.log(posts)
  })
})

app.post('/deletar', function(req,res){
  post.destroy({where: {'id':req.body.id}})
  .then(function(){
    console.log("Dados excluidos com sucesso")
    res.redirect("/consultar")
  })
})

app.get('/', function (req, res) {
  res.render('primeira_pagina')
})

app.get('/segunda', function (req, res) {
  res.render('segunda_pagina')
})

app.listen(8081, function () {
  console.log('Servidor Ativo!')
})
