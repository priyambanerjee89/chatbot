const express  = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

require('./routes/dialogFlowRoutes')(app);

const PORT = process.env.PORT || 5000;

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0

app.listen(PORT);

