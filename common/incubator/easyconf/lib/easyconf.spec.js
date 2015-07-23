
var easyconf = require('./easyconf');

var config = easyconf
	.create()
	.add({
		foo: 42
	});

