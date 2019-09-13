const express  = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

require('./routes/dialogFlowRoutes')(app);

const PORT = process.env.PORT || 5000;

//disable https for local
if ( process.env.NODE_ENV !== 'production' ) {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0
}
else {
    //point heroku to static assets
    app.use( express.static('client/build') );

    const path = require('path');
    app.get( '*', (  req, res ) => {
        res.sendFile(  path.resolve(__dirname, 'client', 'build', 'index.html'));
    });  
}

app.listen(PORT);

