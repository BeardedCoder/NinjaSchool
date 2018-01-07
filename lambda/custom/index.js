'use strict';

var Alexa = require('alexa-sdk');
const data = require('./data.js');
const helpers = require('./helpers.js');

var DatabaseHelper = require('./databaseHelper.js');
const databaseHelper = new DatabaseHelper();

exports.handler = function(event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = 'amzn1.ask.skill.e8fec4fe-e282-4784-a3c2-838a9baa64ed'
    alexa.resources = languageStrings;
    alexa.registerHandlers(
        newSessionHandlers,
        startSessionHandlers,
        nameSessionHandlers,
        trainingSessionHandlers
    );
    alexa.execute();
};

const languageStrings = {
    'en-US': {
        'translation': {
            'TITLE': "Ninja School",
            'WELCOME_LAUNCH': "Welcome to Ninja School!. <audio src='" + data.songs['intro'] + "' /> Before we start your training, what is your name young master?",
            'ASK_NAME': 'What is your name young master?',
            'WELCOME_NAME': "Welcome ninja<break time='5ms'/> %s! Before we begin make sure your training space is clean. A good ninja always ensures a clean training room. <audio src='" + data.songs['cleaning'] + "' /> I will give you training tasks to complete to enhance your ninja skills. When you are ready to begin, say begin training. ",
            'WELCOME_BACK_NAME': "Welcome back %s! Is your training area clean? A good ninja always ensures a clean training room. <audio src='" + data.songs['cleaning'] + "' /> When you are ready to begin, say begin training. ",
            'BEGIN_TRAINING': 'When you are ready to begin, say begin training. ',
            'HELP_MESSAGE': "You can try: 'start Ninja School' or 'Alexa, ask Ninja School to start'",
            'BYE_MESSAGE': "Farewell ninja, return soon"
        }
    }
};

const states = {
    START:      "_START",
    NAME:       "_NAME",
    TRAINING:   "_TRAINING",
    SUCCESS:    "_SUCCESS",
    FAILURE:    "_FAILURE"
};

const newSessionHandlers = {
    'NewSession': function() {
        databaseHelper.createTable();

        this.handler.state = states.START;
        this.emitWithState('NewSession');
    }
};

const startSessionHandlers = Alexa.CreateStateHandler(states.START, {
    'NewSession': function() {
        this.attributes['wins'] = 0;
        this.attributes['fail'] = false;
        this.attributes['stage'] = 1;

        this.handler.state = states.NAME;
        this.response
            .speak(this.t('WELCOME_LAUNCH'))
            .listen(this.t('ASK_NAME'));
        this.emit(':responseReady');
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
        this.response
            .speak('I\'m sorry, I don\'t understand. ')
            .listen('Try again please.');
        this.emit(':responseReady');
    }
});

const nameSessionHandlers = Alexa.CreateStateHandler(states.NAME, {
    'NewSession': function () {
        this.emit('NewSession');
    },
    'MyNameIsIntent': function () {
        var userId = this.event.context.System.user.userId;
        var name = this.event.request.intent.slots.name.value;

        if(!name || name.length === 0 ) {
            this.handler.state = states.NAME;
            this.emitWithState('AMAZON.HelpIntent');
        } else {

            name = name.charAt(0).toUpperCase() + name.slice(1);
            this.attributes['name'] = name;

            var say;
            var that = this;

            databaseHelper.readData(userId, name)
                .then(function(data) {

                    var stage = data.data.stage;
                    var wins = data.data.hasOwnProperty('wins') ? data.data.wins : 0;

                    that.attributes['stage'] = stage;
                    that.attributes['wins'] = wins;

                    name = helpers.getRankWithName(stage, name)

                    say = 'WELCOME_BACK_NAME';
                })
                .catch(function(error) {
                    say = 'WELCOME_NAME';
                })
                .finally(function() {
                    that.response
                        .speak(that.t(say, name))
                        .listen(that.t('BEGIN_TRAINING', name));
                    that.emit(':responseReady');
                });
        }
    },
    'TrainingIntent': function() {
        this.handler.state = states.TRAINING;
        this.emitWithState('TrainingIntent', '');
    },
    "AMAZON.HelpIntent": function() {

        var say = 'I\'m sorry, I didn\'t understand. Try starting with "My name is ".'

        this.response
            .speak(say)
            .listen(this.t(say));
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
        this.response
            .speak('I\'m sorry, I don\'t understand. ')
            .listen('Try again please.');
        this.emit(':responseReady');
    }
});

const trainingSessionHandlers = Alexa.CreateStateHandler(states.TRAINING, {
    'NewSession': function () {
        this.emit('NewSession');
    },
    'TrainingIntent': function(say) {
        var name = this.attributes['name'];
        var stage = this.attributes['stage'];
        var wins = this.attributes['wins'];
        var failed = this.attributes['fail'];

        var roundsToComplete = helpers.getRoundsToRankUp(stage);
        var maxStage = data.stages;

        if(!failed && wins > 0 && wins % roundsToComplete == 0 && stage != maxStage) {
            stage++;
            if(stage > data.stages) {
                stage = data.stages;
            } else {

                var speechCon = helpers.getSpeechCon(true);

                var audio = data.songs['congrats'];

                say = "<audio src='" + audio + "' /> ";
                say += speechCon + ' ninja, you have completed this level of your training. ';
                say += 'You have earned the rank of ' + helpers.getRank(stage) + '. ';
                say += 'Congratulations ' + helpers.getRankWithName(stage, name) + '! ';
                say += 'Let\'s move on to your next task. ';

                this.attributes['wins'] = 0;

                this.response.cardRenderer(
                    'Ninja School',
                    'Congratulations ' + name + '! You have earned the rank of ' + helpers.getRank(stage) + '. ',
                    helpers.getImageObject
                );
            }
            this.attributes['stage'] = stage;
        }

        say = helpers.getActivity(say, stage);

        var query = 'Did you complete your task successfully ' + helpers.getRankWithName(stage, name) + '?';

        this.response
            .speak(say + query)
            .listen(query);
        this.emit(':responseReady');
    },
    'AMAZON.YesIntent': function() {

        this.attributes['wins']++;

        var wins = this.attributes['wins'];
        var stage = this.attributes['stage'];

        var roundsLeft = helpers.getRoundsToRankUp(stage) - wins;
        var speechCon = helpers.getSpeechCon(true);

        var say = speechCon;
        var taskWord = 'tasks';;

        if(roundsLeft === 1) {
            taskWord = 'task';
        }

        say += ' You only have ' + roundsLeft + ' ' + taskWord + ' to complete before you achieve your next rank!';
        say += ' Let\'s move on to your next task. ';
        this.emitWithState('TrainingIntent', say);
    },
    'AMAZON.NoIntent': function() {
        this.attributes['fail'] = true;

        var speechCon = helpers.getSpeechCon(false);

        var say = speechCon + ' Do not fear young ninja, it takes many years to become a master. ';
        say += 'Let\'s move on to your next task. ';
        this.emitWithState('TrainingIntent', say);
    },
    "AMAZON.CancelIntent": function() {
        cancelTraining.call(this);
    },
    "AMAZON.StopIntent": function() {
        cancelTraining.call(this);
    },
    'Unhandled': function() {
        this.response
            .speak('I\'m sorry, I don\'t understand. ')
            .listen('Try again please.');
        this.emit(':responseReady');
    }
});

function cancelTraining() {
    var userId = this.event.context.System.user.userId;
    var name = this.attributes['name'];
    var data = {
        'name': name,
        'stage': this.attributes['stage'],
        'wins': this.attributes['wins']
    };

    var that = this;

    databaseHelper.storeData(userId, name, data)
        .then(
            function(result) {
                return result;
            })
        .catch( function(error) {} )
        .finally(function() {

            that.response.speak(that.t('BYE_MESSAGE'));
            that.emit(':responseReady');
        });
};