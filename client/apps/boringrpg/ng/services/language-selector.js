define([
	'offirmo-app-bootstrap',
	'lodash',
	'rx',
	'jquery',
	'client/apps/boringrpg/ng/services/state-tree/state-tree',
],
function(offirmo_app, _, Rx, $) {
	'use strict';

	offirmo_app.global_ng_module
	.service('languageDetector', ['stateTree', function (state_tree) {

		console.log('installing languageDetector...');
		var view_cursor = state_tree.select('view');

			xxx todo
	}]);
});
