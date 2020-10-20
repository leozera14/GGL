const express = require('express');

const PessoaController = require('./controllers/PessoaController');
const ProductController = require('./controllers/ProductController');

const routes = express.Router();

routes.get('/products', ProductController.Products);
routes.post('/products/new', ProductController.newProducts);
routes.put('/products', ProductController.editProducts);
routes.delete('/products', ProductController.deleteProduct);

routes.post('/pessoa/register', PessoaController.registro);
routes.post('/pessoa/login', PessoaController.login);
routes.get('/indexStore', PessoaController.indexStore);


module.exports = routes;