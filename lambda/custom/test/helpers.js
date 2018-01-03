var helpers = require("../helpers.js");
var chai = require("chai");

chai.should();

describe('getActivty', function() {
	describe('it works', function() {
		helpers.getActivity("test");
	});
});

describe('prepareForCard', function() {
	it('should remove <s>', function() {

		var input = '<s>Stage One!</s> A ninja must be limber and loose.'
		var expected = 'Stage One!\n A ninja must be limber and loose.'

		helpers.prepareForCard(input).should.equal(expected);
	});

	it('should remove <audio>', function() {
		var input = "Some text. <audio src='https://s3.amazonaws.com/asksounds/waitingtime3.mp3' /> More text.";
		var expected = "Some text. More text.";

		helpers.prepareForCard(input).should.equal(expected);
	});

	it('should remove <break>', function() {
		var input = "Welcome ninja<break time='50ms'/> Bob!";
		var expected = "Welcome ninja Bob!";

		helpers.prepareForCard(input).should.equal(expected);
	})
});

describe('getRank', function() {
	it('should remove {name} from end', function() {
		var input = 'Novice {name}';
		var expected = 'Novice';

		helpers.getRank(1).should.equal(expected);
	});

	it('should remove {name} from start', function() {
		var input = '{name} the Great';
		var expected = 'the Great';

		helpers.getRank(3).should.equal(expected);
	});
});