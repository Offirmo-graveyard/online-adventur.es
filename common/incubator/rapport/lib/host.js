'use strict';

var os = require('os');
var child_process = require('child_process');

var _ = require('lodash');
var when = require('when');
var whenCallbacks = require('when/callbacks');


var exec = whenCallbacks.lift(child_process.exec);
function get_cmd_stdout(cmd) {
	return exec(cmd).then(function(res) {
		var stdout = res[1];
		return stdout.trim();
	});
}


function gather_infos(rapport) {
	rapport.base.host = rapport.base.host || {};
	rapport.base.host = _.merge(rapport.base.host, {
		hostname: '(gathering…)',
		arch: process.arch,
		platform: process.platform,
		kernel: '(gathering…)',
		node_version: process.version,
		cpu_cores: _.map(os.cpus(), function(cpu) {
			return cpu.model;
		}),
	});

	rapport.details.host = rapport.details.host || {};
	rapport.details.host = _.merge(rapport.details.host, {
		node: {
			versions: process.versions,
			features: process.features,
			config: process.config,
			additional_config: {
				maxTickDepth: process.maxTickDepth,
			},
		},
		cpus: os.cpus(),
	});

	var get_kernel_release = get_cmd_stdout('uname --kernel-release')
	.then(function(release) {
		rapport.base.host.kernel = release;
	});
	var get_hostname = get_cmd_stdout('hostname')
	.then(function(hostname) {
		rapport.base.host.hostname = hostname;
	});

	rapport.ready = when.join(rapport.ready, when.all([
		get_kernel_release,
		get_hostname,
	]));
}




function gather_linux_infos(rapport) {


	when.map([uname_s, uname_r, uname_p], function(val) {
		console.log(val);
	});
}

module.exports = {
	gather_infos: gather_infos
};
