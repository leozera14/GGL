const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('../src/routes')
const mongoose = require('mongoose');

const app = express();

app.use(cors())
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'tmp', 'uploads')));
mongoose.connect(
  'mongodb://localhost:27017/ggl', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
)

app.listen(3333);