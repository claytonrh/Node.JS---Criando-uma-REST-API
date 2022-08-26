// inclusão dos pacotes
const express = require('express')
const mysql = require('mysql2')

// instancia o express
const app = express()

// definição de porta
const port = 3000

// Abrindo conexão com base de dados
var connection = mysql.createConnection({
  host: 'localhost',
    user: 'root',
    password: 'Ebc91u0dXr81201@',
    database: 'sistema_noticias'
  })

connection.connect();

// serviço de hello word
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// serviço de busca de categorias
app.get('/news-api/v1/categorias', (req, res) => {

  // Busca categorias
  connection.query('SELECT id, nome FROM sistema_noticias.categoria;', function(err, rows, fields) {
    if (err) throw err

    res.send(rows)    
    })        
  })

  // serviço de busca de noticias
  app.get('/news-api/v1/categorias/:categoriaId/noticias', (req, res) => {      

    // // Busca noticia DE UMA CATEGORIA
    connection.query('SELECT id, titulo  FROM sistema_noticias.noticia WHERE id_categoria = ' + req.params.categoriaId, function(err, rows, fields) {
      if (err) throw err
      
      res.send(rows)    
      })        
    })

    // serviço de busca de uma noticia
  app.get('/news-api/v1/categorias/:categoriaId/noticias/:noticiaId', (req, res) => {      

    // // Busca noticia
    connection.query('SELECT id, titulo, conteudo FROM sistema_noticias.noticia WHERE id_categoria = ' + req.params.categoriaId + ' AND id = ' + req.params.noticiaId, function(err, rows, fields) {
      if (err) throw err
      
      res.send(rows[0]) // incluir um array com um zero impede que o objeto seja retornado dentro de um array
      })        
    })

// subindo servidor node
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})