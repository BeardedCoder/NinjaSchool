'use strict';

var Alexa = require('alexa-sdk');
const data = require('./data.js');
const helpers = require('./helpers.js');

exports.handler = function(event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = 'amzn1.ask.skill.e8fec4fe-e282-4784-a3c2-838a9baa64ed'
    alexa.resources = languageStrings;
    alexa.registerHandlers(
        newSessionHandlers,
        startSessionHandlers,
        trainingSessionHandlers
    );
    alexa.execute();
};

const languageStrings = {
    'en-US': {
        'translation': {
            'TITLE': "Ninja School",
            'WELCOME_LAUNCH': "Welcome to Ninja School!. <audio src='" + data.songs['intro'] + "' /> Before we start your training, what is your name young master?",
            'WELCOME_NAME': "Welcome ninja<break time='5ms'/> %s! Before we begin make sure your training space is clean. A good ninja always ensures a clean training room. '<audio src='" + data.songs['medium'] + "' /> When you are ready to begin, say begin training. ",
            'HELP_MESSAGE': "You can try: 'start Ninja School' or 'Alexa, ask Ninja School to start'",
            'BYE_MESSAGE': "Farewell ninja, return soon"
        }
    }
};

const states = {
    START:      "_START",
    TRAINING:   "_TRAINING",
    SUCCESS:    "_SUCCESS",
    FAILURE:    "_FAILURE"
};

const newSessionHandlers = {
    'NewSession': function() {
        this.handler.state = states.START;
        this.emitWithState('NewSession');
    }
};

const startSessionHandlers = Alexa.CreateStateHandler(states.START, {
    'NewSession': function() {
        this.response.speak(this.t('WELCOME_LAUNCH')).listen();
        this.attributes['wins'] = 0;
        this.attributes['losses'] = 0;
        this.attributes['stage'] = 1;
        this.emit(':responseReady');
    },
    'MyNameIsIntent': function () {
        var name = this.event.request.intent.slots.name.value;
        name = name.charAt(0).toUpperCase() + name.slice(1);
        this.attributes['name'] = name;

        this.response
            .speak(this.t('WELCOME_NAME', name))
            .listen(this.t('WELCOME_NAME', name));
            //.cardRenderer(data.appName, helpers.prepareForCard(speechOutput));
        this.emit(':responseReady');
    },
    'TrainingIntent': function() {
        var name = this.attributes['name'];
        var stage = this.attributes['stage'];

        var say = '<s>Stage ' + stage + ' !</s> ';
        this.handler.state = states.TRAINING;
        this.emitWithState('TrainingIntent', say);
    },
    "AMAZON.HelpIntent": function() {
        this.response
            .speak(this.t("HELP_MESSAGE"))
            .listen(this.t("HELP_MESSAGE"));
        this.emit(':responseReady');
    },
    "AMAZON.CancelIntent": function() {
        this.response.speak(this.t('BYE_MESSAGE'));
        this.emit(':responseReady');
    },
    "AMAZON.StopIntent": function() {
        this.response.speak(this.t('BYE_MESSAGE'));
        this.emit(':responseReady');
    },
    'Unhandled': function() {

        var speechOutput = 'I\'m sorry ninja warrior, I don\'t understand. ';
        speechOutput += data.helpText;

        this.response
            .speak(speechOutput)
            .listen('Try again please.');
        this.emit(':responseReady');
    }
});

const trainingSessionHandlers = Alexa.CreateStateHandler(states.TRAINING, {
    'TrainingIntent': function(say) {
        var name = this.attributes['name'];
        var stage = this.attributes['stage'];
        var wins = this.attributes['wins'];

        var roundsToComplete = data.rounds;
        console.log('wins: ', wins, roundsToComplete);

        if(wins > 0 && wins % roundsToComplete == 0) {
            stage = wins / roundsToComplete;
            this.attributes['stage'] = stage;
            say = 'Congratulations young warrior, you have earned the right to move to the next stage of training. ';
            say += 'You have now earned the rank of ' + helpers.getRank(stage) + '. ';
            say += 'Congratulations ' + helpers.getRankWithName(stage, name) + '! ';
            say += 'Let\'s move on to your next task. ';
            console.log('New stage');
        }

        say = helpers.getActivity(say);

        say += 'Did you complete your tasks successfully ninja warrior ' + name + '?';

        this.response
            .speak(say)
            .listen(say);
            //.cardRenderer(data.appName, helpers.prepareForCard(speechOutput));
        this.emit(':responseReady');
    },
    'AMAZON.YesIntent': function() {
        this.attributes['wins']++;
        var say = 'Well done my young ninja. Let us move on to your next task. ';
        this.emitWithState('TrainingIntent', say);
    },
    'AMAZON.NoIntent': function() {
        this.attributes['losses']++;
        var say = 'Do not fear young ninja, it takes many years to become a master. ';
        this.emitWithState('TrainingIntent', say);
    },
    "AMAZON.CancelIntent": function() {
        this.response.speak(this.t('BYE_MESSAGE'));
        this.emit(':responseReady');
    },
    "AMAZON.StopIntent": function() {
        this.response.speak(this.t('BYE_MESSAGE'));
        this.emit(':responseReady');
    },
    'Unhandled': function() {
        this.response
            .speak('I\'m sorry ninja warrior, I don\'t understand. ')
            .listen('Try again please.');
        this.emit(':responseReady');
    }
});