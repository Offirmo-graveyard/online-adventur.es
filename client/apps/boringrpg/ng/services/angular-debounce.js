define([
	'offirmo-app-bootstrap',
	'lodash'
],
function(offirmo_app, _) {
	'use strict';

	offirmo_app.global_ng_module
	.service('angularDebounce', [function () {
		return function angular_debounce($scope, fn, wait_ms, leading) {
			var options = {
				leading: !! leading,
				trailing: !leading
			};
			return _.debounce(function () {
				$scope.$evalAsync(fn);
			},
			wait_ms,
			options);
		}
	}]);
});
