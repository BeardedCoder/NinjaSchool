'use strict';

const data = require('./data.js');

exports.getActivity = function(speechOutput) {

    var stage = 1;

    var activityNumber = getRandom(0, data.tasks[stage].length - 1);
    var repetitions = getRandom(1, 5);

    var task;

    if(repetitions != 1) {
    	task = data.tasks[stage][activityNumber]['task'];
	} else {
    	task = data.tasks[stage][activityNumber]['taskSingular'];
	}

    task = task.replace('{reps}', repetitions);

    speechOutput += data.tasks[stage][activityNumber]['scene'] + ' ';
    speechOutput += task + ' ';
    speechOutput += "<s>Ready?</s> <s>Go!</s> ";

    for(var i = 1; i <= repetitions; i++) {
        speechOutput += i + "<break time='1s'/> ";
    }

    return speechOutput;
};

exports.getRank = function(stage) {

    var rank = data.ranks[stage];

    rank = rank.replace(/ ?{name} ?/, '');
    return rank;
};

exports.getRankWithName = function(stage, name) {
    var rank = data.ranks[stage];

    rank = rank.replace(/ ?{name} ?/, name);
    return rank;
}

exports.prepareForCard = function(speechOutput) {

	var output = speechOutput.replace(/<\/s>/, '\n');
	output = output.replace(/<.*>/, '');
	output = output.split('  ').join(' ');
	return output;
};

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}