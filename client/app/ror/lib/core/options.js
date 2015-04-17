/** Rise of the replicators options
 *  = dynamically injected or changeable in-game
 */
define(
[
	'lodash',
	'carnet',
	'./errors'
],
function(_, Carnet, Errors) {
	'use strict';

	function check_and_complete(options) {
		// scan options and complete options
		options = options || {};
		options.logger = options.logger || Carnet.make_new({enhanced: true});

		return options;
	}

	return {
		check_and_complete: check_and_complete
	};
});
