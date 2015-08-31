define([
	'offirmo-app-bootstrap',
	'lodash',
	'text!client/apps/boringrpg/ng/directives/footer/footer.html',
	'css!client/apps/boringrpg/ng/directives/footer/footer.css'
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

				$scope.buttons = [
					{
						id: 'explore',
						icon: 'icomoon-treasure-map'
					},
					{
						id: 'gear',
						icon: 'icomoon-battle-gear'
					},
					{
						id: 'skills',
						icon: 'icomoon-death-note'
					},
					{
						id: 'social',
						icon: 'icomoon-eagle-emblem'
					},
					{
						id: 'feats',
						icon: 'icomoon-laurel-crown'
					},
					{
						id: 'chat',
						icon: 'icomoon-conversation'
					},
				];

				$scope.flexibleLayoutOptions = {
					ratios: _.map($scope.buttons, function(){return 1;}), // everyone equal (for now)
					direction: 0 // FlexibleLayout.DIRECTION_X
				};

			}]
		};
	}]);
});
