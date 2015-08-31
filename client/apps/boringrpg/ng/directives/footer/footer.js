define([
	'offirmo-app-bootstrap',
	'lodash',
	'text!client/apps/boringrpg/ng/directives/footer/footer.html',
	//'css!client/apps/boringrpg/ng/directives/footer/footer.css'
],
function(offirmo_app, _, tpl) {
	'use strict';

	offirmo_app.global_ng_module
	.directive('footer', ['$famous', function ($famous) {
		return {
			restrict: 'E', // element,
			scope: {
			},
			template: tpl,
			controller: ['$scope', function link($scope) {
				$scope.flexibleLayoutOptions = {
					ratios: [1, 1, 1, 1, 1, 1],
					direction: 0 // FlexibleLayout.DIRECTION_X
				};

			}]
		};
	}]);
});
