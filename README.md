# botkit-ai

Middleware for botkit to integrate API.AI.

Import the library and configure the basic settings.

var botkitai = require('botkit-ai')({
	token: <API AI token, require>,
	errorText: <What you want to say if there is an API error, optional>,
	defaultText: <What you want to see if there is no response, optional>,
	unknownAction: <Label to be used when APIAI response has no action, default 'unknown'>
});

errorText, defaultText, unknownAction are all optional and could also be handled in the bot listener.

Set the middleware to use botkitai.

controller.middleware.receive.use(botkitai.receive);

now your bot is using the middleware! Your messages will now have a few new parameters on them.

Here is an example of what you will get attached to your message. It is found at message.ai

{ 
	source: 'domains',
	resolvedQuery: 'hello',
	action: 'smalltalk.greetings',
	parameters: 
		{ 
			simplified: 'hello' 
		},
	metadata: {},
	fulfillment: 
		{ 
			speech: 'Good day!' 
		},
	score: 0
}