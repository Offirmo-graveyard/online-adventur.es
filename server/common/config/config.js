'use strict';

var package_json = require('../../../package.json');

module.exports = {
	agent_email    : 'offirmo.net+onlineadventures-server@gmail.com',
	kill_timeout_s : 30,  //< max time we give ourselves to shutdown
	version: package_json.version,
};
