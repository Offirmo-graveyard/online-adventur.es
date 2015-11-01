/** Detects when a new version of the app is available.
 */
define([
	'lodash',
	'baobab',
	'appcache-nanny',
	'boringrpg/lib/state-tree',
],
function(_, Baobab, AppCacheNanny, state_tree) {
	'use strict';

	var pending_update_cursor = state_tree.select('update_pending');

	function switch_to_updater_if_appropriate() {
		if (window.offirmo_loader.stage < 2) {
			window.offirmo_loader.change_stage(3);
		}
	}

	function signal_pending_update() {
		if (! window.offirmo_loader.update_pending) {
			console.info('update watcher : pending update detected !');
			window.offirmo_loader.update_pending = true;
			pending_update_cursor.set(true);
		}
		switch_to_updater_if_appropriate();
	}

	// https://github.com/gr2m/appcache-nanny
	appCacheNanny.on('update', function() {
		// this event is completely unreliable
		//console.log('AppCacheNanny event : update', arguments);
	});
	appCacheNanny.on('noupdate', function() {
		// this event is completely unreliable
		//console.log('AppCacheNanny event : noupdate', arguments);
	});
	appCacheNanny.on('error', function() {
		console.error('AppCacheNanny event : error', arguments);
	});
	appCacheNanny.on('obsolete', function() {
		console.warn('AppCacheNanny event : obsolete', arguments);
	});
	appCacheNanny.on('downloading', function() {
		console.log('AppCacheNanny event : downloading', arguments);
		signal_pending_update();
	});
	appCacheNanny.on('progress', function() {
		console.log('AppCacheNanny event : progress', arguments);
		signal_pending_update();
	});
	appCacheNanny.on('cached', function() {
		console.log('AppCacheNanny event : cached', arguments);
	});
	appCacheNanny.on('updateready', function() {
		// update pending, and all files are downloaded
		console.log('XXX AppCacheNanny event : updateready', arguments);
		signal_pending_update();
		if (window.offirmo_loader.stage !== 2)
			window.location.reload(true);
	});
	AppCacheNanny.on('init:downloading', function() {
		console.log('AppCacheNanny event : init:downloading', arguments);
		signal_pending_update();
	});
	AppCacheNanny.on('init:progress', function() {
		console.log('AppCacheNanny event : init:progress', arguments);
		signal_pending_update();
	});
	AppCacheNanny.on('init:cached', function() {
		console.log('AppCacheNanny event : init:cached', arguments);
	});
	AppCacheNanny.on('start', function() {
		console.log('AppCacheNanny event : start');
	});
	AppCacheNanny.on('stop', function() {
		console.log('AppCacheNanny event : stop');
	});

	// appcache nanny handlers have now (hopefully, this is not reliable…) replaced our early handlers.
	// Transmit possible previous state.
	pending_update_cursor.set(window.offirmo_loader.update_pending);
	// and program periodic update checks
	AppCacheNanny.start({
		loaderPath: 'client/apps/boringrpg/appcache-loader.html',
		checkInterval:        24 * 60 * 60 * 1000, // ms
		offlineCheckInterval: 24 * 60 * 60 * 1000, // ms

	});
	//console.log('AN options', AppCacheNanny.get());

	/*
	console.log('application cache state UNCACHED',    window.applicationCache.UNCACHED);
	console.log('application cache state IDLE',        window.applicationCache.IDLE);
	console.log('application cache state CHECKING',    window.applicationCache.CHECKING);
	console.log('application cache state DOWNLOADING', window.applicationCache.DOWNLOADING);
	console.log('application cache state UPDATEREADY', window.applicationCache.UPDATEREADY);
	console.log('application cache state OBSOLETE',    window.applicationCache.OBSOLETE);
	*/
});
