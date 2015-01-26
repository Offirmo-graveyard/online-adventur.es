'use strict';

var os = require('os');
var _ = require('lodash');
var when = require('when');


// Get local IPs for display at start, ease debug with my VM
// http://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js
// http://nodejs.org/api/os.html#os_os_networkinterfaces
function get_local_ips() {
	return _.chain(os.networkInterfaces())
	.values()
	.flatten()
	.filter(function(val){
		return (val.family === 'IPv4' && val.internal === false);
	})
	.pluck('address')
	.value();
}



function gather_infos(rapport) {
	rapport.base.host = rapport.base.host || {};
	rapport.base.host = _.merge(rapport.base.host, {
		local_ips: get_local_ips()
	});

	// sync : ok
}


module.exports = {
	gather_infos: gather_infos
};
