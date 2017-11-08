'use strict';

const AWS = require('aws-sdk');
const ssm = new AWS.SSM();
let appURL;

function getConfigParameter(key, isEncrypted) {

    const params = {
        Name: key, /* required */
        WithDecryption: isEncrypted
    };

    // TODO: retrive the config values, cache them and then use cached values until they expire.

    return ssm.getParameter(params).promise();

};

exports.handler = function (event, context) {

    getConfigParameter('appURL', false).then(data => {

        appURL = data.Parameter.Value;
        console.log(`appURL - ${appURL}`);

        // do other work eg: if this was DB connectionString, connect to DB and perform DB operations.

        context.succeed("done");

     }).catch(err => {
        context.fail(err);
    });
}