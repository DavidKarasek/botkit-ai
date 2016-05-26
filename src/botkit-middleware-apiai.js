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
                var result = res.result;
                if (result.speech === '') {
                    message.action = result.action || unknownAction;
                    message.speech = defaultText;
                }
            });

            request.on('error', function(err) {
                message.action = 'error';
                message.speech = errorText;
            });

            request.end();
        }

    };


    return middleware;

};