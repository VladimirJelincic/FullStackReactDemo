const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const router = require('./routes/router');
const { db } = require('./config');
mongoose.connect(
  `mongodb://localhost/${db}`,
  { useNewUrlParser: true }
);
mongoose.set('useCreateIndex', true);
app.use(bodyParser.json({ type: '*/*' }));
router(app);
const port = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(port);
console.log(`Server up and listening on port ${port}`);
