// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'lodash',
],
function(_) {
	'use strict';

	return {
		admin_email: 'offirmo.net+onlineadventures-admin@gmail.com'
	};
});
