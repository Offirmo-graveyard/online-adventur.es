// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
	'../incubator/easyconf'
], function(easyconf) {

	var config = easyconf.create()
		.add({
			admin_email: 'offirmo.net+onlineadventures-admin@gmail.com'
		});

	return config;
});
