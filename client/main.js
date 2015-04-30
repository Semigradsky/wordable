Template.input.events({
	'submit .new-sentence': function submitSentence(e) {
		e.preventDefault();
		var text = e.target.text.value;
		Sentences.insert({ name: text, createdBy: 'me' /*Meteor.userId()*/, active: true });
		e.target.text.value = '';
		
		var words = text.split(' ');
		_.each(words, function(word) {
			Words.insert({ name: word, active: true });
		});
	}
});

Template.playground.helpers({
	'words': function wordsHelper() {
		return Words.find({ active: true });
	},
	'wordsOptions': function wordsOptionsHelper() {
		return {
			group: {
				name: 'game',
				put: false
			},
			sort: false
		};
	},
	'wordsInbox': function wordsInboxHelper() {
		return Words.find({ active: true });
	},
	'wordsInboxOptions': function wordsInboxOptionsHelper() {
		return {
			group: {
				name: 'game',
				put: true`
			}
		};
	}
});