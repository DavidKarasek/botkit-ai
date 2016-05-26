# botkit-ai

# Middleware for botkit to integrate API.AI.

# Import the library and configure the basic settings.

var botkitai = require('botkit-ai')({
	token: <API AI token, require>,
	errorText: <What you want to say if there is an API error, optional>,
	defaultText: <What you want to see if there is no response, optional>,
	unknownAction: <Label to be used when APIAI response has no action, default 'unknown'>
});

# errorText, defaultText, unknownAction are all optional and could also be handled in the bot listener.

# Set the middleware to use botkitai.

controller.middleware.receive.use(botkitai.receive);

# now your bot is using the middleware! Your messages will now have a few new parameters on them.

controller.hears('.*', 'message_received', function (bot, message) {
	bot.reply(message.speech); // message.speech has the response from API.AI
	
	//  You could also override specific actions
	//  if you so choose.                         
	
	if (message.action === 'smalltalk.confirmation') {
		bot.reply("Actually, I don't agree at all.")
	}

});