const express = require('express');

const PessoaController = require('./controllers/PessoaController');
const ProductController = require('./controllers/ProductController');

const routes = express.Router();

routes.get('/', PessoaController.index);

routes.post('/pessoa/register', PessoaController.registro);
routes.post('/pessoa/login', PessoaController.login);
routes.post('/products/new', ProductController.newProducts);

module.exports = routes;