'use strict';

const AWS = require('aws-sdk');
const ssm = new AWS.SSM();

function getConfigParameters(params) {
    // TODO: retrive the config values, cache them and then use cached values until they expire.

    return ssm.getParameters(params).promise();

}

exports.handler = function (event, context) {

    let params = {
        Names: ['dbConnectionString', 'dbUsername','dbPassword'],
        WithDecryption: true
    };

    getConfigParameters(params).then(data => {
        
        let config = {}
        for (let v of data.Parameters) {
            config[v.Name] = v.Value;
        }

         console.log(`Config Paramters retrieved from SSM param store after decryption- ${JSON.stringify(config)}`);
        // implemented other logic eg: if this was DB connectionString, connect to DB and perform DB operations.

        context.succeed("done");

    }).catch(err => {
        context.fail(err);
    })
}
