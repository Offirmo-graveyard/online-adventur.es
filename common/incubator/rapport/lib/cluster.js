'use strict';

var _ = require('lodash');
var cluster = require('cluster');
var when = require('when');



function gather_infos(rapport) {

	var cluster_worker_infos = _.pick(cluster.worker, [
		'id', 'uniqueID', 'workerID', 'state',
		'debugPort', 'maxTickDepth', '_handleQueue', 'connected', 'title'
	]);
	cluster_worker_infos['...'] = '';

	rapport.base.cluster = rapport.base.cluster || {};
	rapport.base.cluster = _.merge(rapport.base.cluster, cluster.isMaster ?
		{
			isMaster: cluster.isMaster,
		} : {
			isWorker: cluster.isWorker,
			worker_infos: cluster.isWorker ? cluster_worker_infos : 'n/a'
		}
	);

	// sync : ok
}




module.exports = {
	gather_infos: gather_infos
};
