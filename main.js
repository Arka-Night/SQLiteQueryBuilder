const express = require('express');
const port = 80;
const cors = require('cors');
const app = express();

const routes = require('./routes');

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => {console.log('Server listening on port ' + port)})