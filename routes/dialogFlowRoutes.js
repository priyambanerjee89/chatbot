const dialogflow = require('dialogflow');
const config = require('../config/keys');

const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath( config.googleProjectID, config.dialogFlowSessionID );


module.exports = app => {
    app.get('/', (req, res) => {
        res.send({'hello':'d'});
    });
    
    app.post('/api/df_text_query', async ( req, res ) => {

        // The text query request.
        const request = {
            session: sessionPath,
            queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: req.body.text,
                // The language used by the client (en-US)
                languageCode: config.dislaogFlowSessionLanguageCode,
            },
            },
        };
        
        // Send request and log result
        let responses = await sessionClient.detectIntent(request);
        console.log('Detected intent');
        const result = responses[0].queryResult;
        // console.log(`  Query: ${result.queryText}`);
        // console.log(`  Response: ${result.fulfillmentText}`);
        // if (result.intent) {
        //     console.log(`  Intent: ${result.intent.displayName}`);
        // } else {
        //     console.log(`  No intent matched.`);
        // }
        
        res.send( responses[0].queryResult );
    });
    
    app.post('/api/df_event_query', ( req, res ) => {
        res.send({'do':'event query'});
    });
}