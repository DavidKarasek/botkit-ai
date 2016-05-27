var apiai = require('apiai');

module.exports = function(config) {

    if (!config || !config.token) {
        throw new Error('No api.ai API token specified');
    }

    var errorText = config.errorText || '';
    var defaultText = config.defaultText || '';
    var unknownAction = config.unknownAction || 'unknown';

    var AI = apiai(config.token);

    var middleware = {};

    middleware.receive = function(bot, message, next) {
        if (message.text) {
            var request = AI.textRequest(message.text);
            request.on('response', function(res) {
                message.ai = res.result;
                console.log('res: ', res.result);
                next();
            });

            request.on('error', function(err) {
                console.error('Error connecting with API.AI: ', err);
                message.ai.error = err;
                next();
            });

            request.end();
        }

    };


    return middleware;

};
