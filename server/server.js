const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const router = require('./routes/router');

mongoose.connect(
  'mongodb://localhost/poviol_vjelincic',
  { useNewUrlParser: true }
);
mongoose.set('useCreateIndex', true);
app.use(bodyParser.json({ type: '*/*' }));
router(app);
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log(`Server up and listening on port ${port}`);
