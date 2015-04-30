Template.input.events({
	'submit .new-sentence': function submitSentence(e) {
		e.preventDefault();
		var text = e.target.text.value;
		Sentences.insert({ name: text, createdBy: 'me' /*Meteor.userId()*/ });
		e.target.text.value = '';
	}
});