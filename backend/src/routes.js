const express = require('express');
const multer = require('multer');
const multerConfig = require('./multer');

const PessoaController = require('./controllers/PessoaController');
const ProductController = require('./controllers/ProductController');
const StoreController = require('./controllers/StoreController');

const routes = express.Router();
const upload = multer(multerConfig);

routes.get('/products', ProductController.Products);
routes.post('/products/new', upload.single('imagem_produto'), ProductController.newProducts);
routes.put('/products', ProductController.editProducts);
routes.delete('/products', ProductController.deleteProduct);

routes.post('/pessoa/register', PessoaController.registro);
routes.post('/pessoa/login', PessoaController.login);


routes.get('/indexStore', StoreController.indexStore);
routes.get('/storeProducts', StoreController.storeProducts);

routes.post('/files', upload.single('file'), (req, res) => {
  console.log(req);

  return res.json({ ok: true });
})


module.exports = routes;