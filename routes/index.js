var express = require('express');
var router = express.Router();
const db = require('../db');

/* GET home page. */
router.get('/', async function(req, res) {
  res.render('index', { docs: await db.findAll()});
});

/* GET new page. */
router.get('/new', function(req, res, next){
  res.render('new',{title:"Cadastro de Cliente", action:"/new"});
});

/* POST new page. */
router.post('/new', async function(req, res){
  const nome = req.body.nome;
  const idade = parseInt(req.body.idade);
  const uf = req.body.uf;
  await db.insert({nome, idade, uf});
  res.redirect('/?new=true');
});

module.exports = router;
