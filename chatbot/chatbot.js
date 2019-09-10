'use strict'

const dialogflow = require('dialogflow');
const config = require('../config/keys');
const structjson = require('structjson');

const projectID = config.googleProjectID;
const credentials = {
    client_email: config.googleClientEmail,
    private_key: config.googlePrivateKey
};

const sessionClient = new dialogflow.SessionsClient({ projectID: projectID, credentials: credentials});
const sessionPath = sessionClient.sessionPath( config.googleProjectID, config.dialogFlowSessionID );

module.exports = {
    textQuery: async function( text, params = {} ) {
        let self = module.exports;

        // The text query request.
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    // The query to send to the dialogflow agent
                    text: text,
                    // The language used by the client (en-US)
                    languageCode: config.dislaogFlowSessionLanguageCode,
                },
            },
            queryParams: {
                payload: {
                    data: params
                }
            }
        };
        
        // Send request and log result
        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction( responses );
        console.log('Detected intent');
        
        return responses;
    },

    eventQuery: async function( event, params = {} ) {
        let self = module.exports;

        // The text query request.
        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    // The query to send to the dialogflow agent
                    name: event,
                    parameters: structjson.jsonToStructProto( params ),
                    // The language used by the client (en-US)
                    languageCode: config.dislaogFlowSessionLanguageCode,
                },
            }
        };
        
        // Send request and log result
        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction( responses );
        console.log('Detected intent');
        
        return responses;
    },

    handleAction: function( responses ) {
        return responses;
    }
}