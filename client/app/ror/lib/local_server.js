/* Rise of the replicators server
 * Following code is made to run in browser, web worker or node.js.
*/
define(
[
	'lodash',
	'Carnet',
	'server',
	'client',
],
function(_, Carnet, RorServer, RorClient) {
	'use strict';

	return {
		make_new: function(options) {
			var logger = options.logger = options.logger || Carnet.make_new({enhanced: true});

			var server = RorServer.make_new(options);

			var client = RorClient.make_new(server, options);

		}
	};
});
