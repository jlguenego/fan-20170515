'use strict';

var express = require('express'); // charge ExpressJS
var serveIndex = require('serve-index');
var ws = require('./webservice.js');


var app = express();

app.use('/ws/', ws);

app.use(express.static('.'));
app.use(serveIndex('.', {
	icons: true
}));

app.use(['/app/produits', '/app/services', '/app/contact'], function (req, res, next) {
	res.sendFile('./app/index.html', {
		root: __dirname
	});
});

app.use(function (req, res, next) {
	console.log('404: Page not Found', req.url);
	next();
});

app.listen(8000, function () {
	console.log('server started on port 8000');
});