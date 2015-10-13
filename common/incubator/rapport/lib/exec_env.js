'use strict';

var _ = require('lodash');
var when = require('when');


function gather_infos(rapport) {

	var env = _.cloneDeep(process.env);
	// clean a few properties
	delete env.LS_COLORS;
	delete env.DISPLAY;
	delete env.SAUCE_ACCESS_KEY;
	delete env.MANDRILL_API_KEY;

	rapport.base.exec_env = rapport.base.exec_env || {};
	rapport.base.exec_env = _.merge(rapport.base.exec_env, {
		process: {
			execPath: process.execPath,
			argv: process.argv,
			pid: process.pid,
			title: process.title,
		},
		node: {

		},
		env: env,
	});

	rapport.details.exec_env = rapport.details.exec_env || {};
	rapport.details.exec_env = _.merge(rapport.details.exec_env, {
		process: {
			getgroups: process.getgroups(),
			getgid: process.getgid(),
			getuid: process.getuid(),
			umask: process.umask(),
			execArgv: process.execArgv,
		},
	});

	// sync : ok
}


module.exports = {
	gather_infos: gather_infos
};
