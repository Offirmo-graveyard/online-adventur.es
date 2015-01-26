// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
	'when',
	'./lib/host',
	'./lib/local_ips',
	'./lib/exec_env',
	'./lib/cluster',
],
function(when, HostInfosProvider, LocalIpsProvider, ExecEnvInfosProvider, ClusterInfosProvider) {
	'use strict';


	function make_new() {
		var rapport = {
			// organized by level
			base: {},
			details: {},
			ready: when.resolve(true),
		};

		rapport.update = function(path) {
			// TODO
		};


		// base
		rapport.entry_point = require.main.filename;

		// more
		HostInfosProvider.gather_infos(rapport);
		LocalIpsProvider.gather_infos(rapport);
		ExecEnvInfosProvider.gather_infos(rapport);
		ClusterInfosProvider.gather_infos(rapport);

		return rapport;
	}



	return {
		make_new: make_new
	};
});
