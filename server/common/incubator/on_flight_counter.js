

// onflight requests counter (experimental)
var onflight_count = 0;
server.on('request', function(req, res) {
	onflight_count++;
	logger.log('* seen server.request "' + req.originalUrl + '", on flight =' + onflight_count);
	res.once('finish', function() {
		onflight_count--;
		logger.log('* seen response.finish, on flight =' + onflight_count);
	});
	res.once('close', function() {
		onflight_count--;
		logger.log('* seen response.close, on flight =' + onflight_count);
	});
});
server.on('close', function() {
	logger.log('* seen server.close, on flight =' + onflight_count);
});

