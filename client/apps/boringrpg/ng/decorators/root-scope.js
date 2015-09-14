define([
	'offirmo-app-bootstrap',
	'lodash'
],
function(offirmo_app, _) {
	'use strict';

	offirmo_app.global_ng_module.config([
		'$provide',
		function($provide) {
			$provide.decorator('$rootScope', [
				'$delegate',
				'$document',
				rootScopeDecorator
			]);
		}
	]);


	/**
	 * RootScope decorator to enable some hacks
	 */

	function rootScopeDecorator($rootScope, $document) {
		var baseDigest = $rootScope.$digest;

		/**
		 * Digest only if document is visible.
		 */

		var digest_count = 0;
		function enhancedDigest() {
			//console.warn('~~~ $rootScope.$digest ~~~');
			console.warn('~~~ $rootScope.$digest ' + (digest_count++) + ' ~~~');

			return baseDigest.apply($rootScope, arguments);
		}

		/**
		 * When document visibility state change, trigger a $digest if any
		 * were scheduled.
		 */

		$document.on('visibilitychange', function () {
			if ($document.get(0).hidden) {
				console.info('document is now hidden');
			}
			else {
				console.info('document is now visible');
				//$rootScope.$digest();
			}
		});

		// Extend the original Scope object so that when new instances are created,
		// it has the new methods.
		var Scope = $rootScope.constructor;
		angular.extend(Scope.prototype, { $digest: enhancedDigest });

		// Also extend the $rootScope instance since it was created before we got
		// any chance to extend Scope.prototype.
		angular.extend($rootScope, { $digest: enhancedDigest });

		return $rootScope;
	}
});
