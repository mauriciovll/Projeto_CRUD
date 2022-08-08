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
router.post('/new', function(req, res, next){
  //Futuramete salvaremos o client aqui!
  res.redirect('/?new=true');
});

module.exports = router;
