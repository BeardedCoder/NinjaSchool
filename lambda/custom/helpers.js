'use strict';

const data = require('./data.js');

exports.getActivity = function(speechOutput, stage) {

    var activityNumber = getRandom(0, data.tasks[stage].length - 1);
    var repetitions = getRandom(1, 5) + stage;

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

exports.getRoundsToRankUp = function(stage) {
    var rounds = data.rounds;
    return rounds + stage;
}

exports.getStage = function(wins) {
    stage = (wins / data.rounds) + 1;
    if(stage > data.stages) {
        stage = data.stages;
    }

    return stage;
}

exports.getRank = function(stage) {

    var rank = data.ranks[stage];

    rank = rank.replace(/ ?{name} ?/, '');
    return rank;
};

exports.getRankWithName = function(stage, name) {
    var rank = data.ranks[stage];

    rank = rank.replace(/{name}/, name);
    return rank;
}

exports.prepareForCard = function(speechOutput) {

	var output = speechOutput.replace(/<\/s>/, '\n');
	output = output.replace(/<.*>/, '');
	output = output.split('  ').join(' ');
	return output;
};

exports.getImageObject = function() {
    var imageObj = {
        smallImageUrl: data.smallImageUrl,
        largeImageUrl: data.largeImageUrl
    };
    return imageObj;
}

exports.getSpeechCon = function(isPositive) {
    var speechCon = "";

    if (isPositive) {
        speechCon = data.speechConsCorrect[getRandom(0, data.speechConsCorrect.length - 1)];
    } else {
        speechCon = data.speechConsWrong[getRandom(0, data.speechConsWrong.length - 1)];
    }
    return "<say-as interpret-as='interjection'>" + speechCon + "! </say-as><break strength='strong'/>";
}


function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}