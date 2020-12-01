const express = require('express');
const multer = require('multer');
const multerConfig = require('./multer');

const PessoaController = require('./controllers/PessoaController');
const ProductController = require('./controllers/ProductController');
const StoreController = require('./controllers/StoreController');
const AgendamentoController = require('./controllers/AgendamentoController');
const NotificationController = require('./controllers/NotificationController');

const routes = express.Router();
const upload = multer(multerConfig);

routes.get('/products', ProductController.Products);
routes.post('/products/new', upload.single('imagem_produto'), ProductController.newProducts);
routes.put('/products', upload.single('imagem_produto'), ProductController.editProducts);
routes.delete('/products', ProductController.deleteProduct);

routes.post('/pessoa/register', PessoaController.registro);
routes.post('/pessoa/login', PessoaController.login);

routes.get('/indexStore', StoreController.indexStore);
routes.get('/storeProducts', StoreController.storeProducts);

routes.get('/agendamentos', AgendamentoController.index);
routes.post('/agendamentos', AgendamentoController.store);
routes.delete('/agendamentos', AgendamentoController.delete);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);



module.exports = routes;