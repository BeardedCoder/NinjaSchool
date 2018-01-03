'use strict';

var Alexa = require('alexa-sdk');
const data = require('./data.js');
const helpers = require('./helpers.js');

exports.handler = function(event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('Start');
    },
    'NewGameIntent': function() {
        this.emit('Start');
    },
    'MyNameIsIntent': function () {
        this.emit('SayHelloName');
    },
    'TrainingIntent': function() {
        this.emit('Training');
    },
    'CompleteIntent': function() {
        var speechOutput = "Well done my young ninja. Let us move on to the next level of your training";
        console.log('CompleteIntent');
        this.response.speak(speechOutput);
        this.emit('Training');
    },
    'FailedIntent': function() {
        var speechOutput = "Do not worry young ninja, it takes many years to grow a tree. Let's try again."
        console.log('FailedIntent');
        this.response.speak(speechOutput);
        this.emit('Training');
    },
    'Start': function() {
        let speechOutput = "";

        speechOutput += "Welcome to Ninja School!. <audio src='" + data.songs['intro'] + "' /> ";
        speechOutput += "Before we start your training, what is your name young master?";

        this.response.speak(speechOutput).listen(speechOutput);
        this.emit(':responseReady');
    },
    'SayHelloName': function () {
        var name = this.event.request.intent.slots.name.value;
        name = name.charAt(0).toUpperCase() + name.slice(1);
        this.attributes['name'] = name;

        let speechOutput = '';

        speechOutput += "Welcome ninja<break time='20ms'/> " + name + "! ";
        speechOutput += 'Before we begin make sure your training space is clean. ';
        speechOutput += 'A good ninja always ensures a clean training room. ';
        speechOutput += "<audio src='" + data.songs['medium'] + "' /> ";
        speechOutput += 'When you are ready to begin, say begin training. ';

        this.response
            .speak(speechOutput)
            .listen(speechOutput);
            //.cardRenderer(data.appName, helpers.prepareForCard(speechOutput));
        this.emit(':responseReady');
    },
    'Training': function() {
        let name = this.attributes['name'];

        let speechOutput = '';

        speechOutput += '<s>Stage One!</s> ';
        speechOutput = helpers.getActivity(speechOutput);

        speechOutput += "Did you complete your tasks successfully ninja warrior?";

        this.response
            .speak(speechOutput)
            .listen(speechOutput);
            //.cardRenderer(data.appName, helpers.prepareForCard(speechOutput));
        this.emit(':responseReady');
    },
    'SessionEndedRequest': function() {
        console.log('Session ended with reason: ' + this.event.request.reason);
    },
    'AMAZON.StopIntent': function() {
        this.response.speak(data.byeText);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function() {
        this.response.speak(data.helpText);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function() {
        this.response.speak(data.byeText);
        this.emit(':responseReady');
    },
    'Unhandled': function() {

        let speechOutput = "Sorry, I didn't get that. ";
        speechOutput += data.helpText;

        this.response.speak(speechOutput);
    }
};