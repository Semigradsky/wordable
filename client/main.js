Template.input.events({
	'submit .new-sentence': function submitSentence(e) {
		e.preventDefault();

		var previousSentence = Sentence.findOne({ active: true });
		
		if (previousSentence) {
			var previousSentenceId = previousSentence._id;

			var wordsFromPreviousSentence = Words.find({
				active: true,
				sentenceId: previousSentenceId
			}).fetch();
			_.each(wordsFromPreviousSentence, function(word) {
				Words.remove(word._id);
			});
			
			var previousInbox = Inbox.find({
				active: true,
				sentenceId: previousSentenceId
			}).fetch();
			_.each(previousInbox, function(inbox) {
				Inbox.remove(inbox._id);
			});
	
			Sentences.update(previousSentenceId, { $set: { active: false } });
		}

		var text = e.target.text.value;
		var sentenceId = Sentences.insert({
			name: text,
			createdBy: 'me' /*Meteor.userId()*/,
			active: true
		});
		e.target.text.value = '';
		
		var words = text.split(' ');
		_.each(words, function(word) {
			Words.insert({
				name: word,
				active: true,
				sentenceId: sentenceId
			});
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