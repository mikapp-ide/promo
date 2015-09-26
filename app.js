"use strict";

var express = require('express'),
	path = require('path'),
	http = require('http'),
	nodemailer = require("nodemailer");

var app = express(),
	port = process.env.VMC_APP_PORT || 3001,
	host = process.env.VCAP_APP_HOST || 'localhost';

var smtpTransport = nodemailer.createTransport("SMTP",{
	service: "Gmail",
	auth: {
		user: "{{account@account.com}}",
		pass: "{{pass}}"
	}
});

app.configure(function () {
	app.set('port', port);
	app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
	app.use(express.bodyParser()),
	app.use(express.static(path.join(__dirname, 'public')));
});

app.post('/signup', function(req, res) {
	var data = req.body;

	if(data && data.email){
		// send mail with defined transport object
		smtpTransport.sendMail({
			from: "{{from-account@account.com}}",
			to: "{{to-account@account.com}}",
			subject: "Mikapp: " + data.email + " subscribed",
			text: data.email + " subscribed"
		}, function(error, response){
			if(error){
				res.send(500, error);
			} else {
				res.send({
					status: "success"
				});
			}
		});
	}
});

app.listen(port, host);
