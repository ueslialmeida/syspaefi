/* importações dos modulos */
var express = require('express');
var expressValidator = require('express-validator');
var consign = require('consign');
var bodyParser = require('body-parser');

/* inicializa o express */
var app = express();

/* configura o framework de views e o caminho para views */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configuração dos middlewares */
app.use(express.static('./app/public'));
app.use(expressValidator());
app.use(bodyParser.urlencoded({extended : true}));

/* executa o autoload */
consign()
.include('app/routes')
.then('config/database.js')
.then('app/models')
.then('app/controllers')
.into(app);

/* exporta o server */
module.exports = app;
