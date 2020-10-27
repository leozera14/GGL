const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('../src/routes')

const app = express();

app.use(cors())
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'tmp', 'uploads')));

app.listen(3333);