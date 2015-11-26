'use strict';

module.exports = function (shipit) {
	require('shipit-deploy')(shipit);
	require('shipit-shared')(shipit);
	require('shipit-nvm')(shipit);
	//require('shipit-npm')(shipit);

	shipit.initConfig({
		default: {
			// **LOCAL** workspace do put stuff
			// cleaned as the 1st step
			workspace: '/home/yej/work/tmp/shipit-workspace',

			// project repository. Will be cloned into 'workspace'
			repositoryUrl: 'https://github.com/Offirmo/online-adventur.es.git',
			//branch : default to master

			// distant server deploy dir
			// should contain a "releases" dir
			deployTo: '/home/yej/work/tmp/shipit-deploy-to',

			// ???
			ignores: [ // default empty
				// '.git',
				// 'node_modules'
			],

			//keepReleases: 2,
			//deleteOnRollback: false,
			//shallowClone: false

			// shipit-nvm
			// will set nvm alias to .nvmrc
			nvm: {
				remote: true,
				sh: '~/.nvm/nvm.sh'
			},
			// shipit-npm
			/*npm: {
				remote: true,
				triggerEvent: 'nvm_alias_complete',
				installArgs: ['npm-pkgr'],
				installFlags: ['-g']
			}*/
		},
		local: {
			servers: [{
				host: 'localhost',
				user: 'offirmo'
			}],

			// shipit-shared
			shared: {
				overwrite: true,
				files: [
					{
						// relative to current dir !
						path: '.env',
						basePath: '/home/offirmo/work/tmp/.env'
					}
				],
			}
		}
	});

	shipit.task('pwd', function () {
		return shipit.remote('pwd');
	});
};
