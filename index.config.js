var path = require('path');
var express = require('express');
var config = require('./server/config');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, '/dist')));
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(bodyParser.json());
var session = require('client-sessions');
app.use(
	session({
		cookieName: 'session',
		secret: 'keyboard cat',
		duration: 30 * 60 * 1000,
		activeDuration: 5 * 60 * 1000
	})
);
// set the view engine to ejs
app.set('view engine', 'ejs');

var LoginApi = require('./server/router/router');
app.use('/api', LoginApi);
const _Pages = require('./server/config/pages.config');
if (_Pages && _Pages.length > 0) {
	_Pages.map(function(data) {
		app.get('/' + data.link, function(req, res, next) {
			if (req.session.user) {
				res.render(__dirname + '/views/pages/' + data.page, { title: data.title });
			} else {
				res.redirect('/login');
			}
		});
	});
} else {
	console.log('Error:=====> No pages are define!');
}
app.get('/login', function(req, res) {
	if (req.session.user) res.redirect('/dashboard');
	else res.render(__dirname + '/views/pages/login', { title: 'User Login' });
});
app.get('/slide', function(req, res) {
	res.render(__dirname + '/views/pages/slides', {
		title: 'slide',
		logotimberline: true,
		financelogo: false,
		Clientdetails: {},
		Mgremailid: 'test@gmail.com',
		apppath: ''
	});
});
app.get('/logout', function(req, res) {
	req.session.user = null;
	if (req.session.user) res.redirect('/dashboard');
	else res.render(__dirname + '/views/pages/login', { title: 'User Login' });
});
app.get('/presentation/:softtoken', function(req, res) {
	res.render(__dirname + '/views/pages/presentation', {
		title: 'client',
		isToken: true,
		logotimberline: 'Timberline financial',
		financelogo: true,
		Clientdetails: 'presentation_end',
		Mgremailid: '',
		documentname: ''
	});
});
app.get('*', function(req, res) {
	res.render(__dirname + '/views/pages/index', { title: 'hello' });
});

// const io = require('socket.io', {
// 	rememberTransport: true,
// 	transports: ['WebSocket']
// })(server);

/**
 * Init socket
 */
let http = require('http').Server(app);
let io = require('socket.io')(http);
var port = process.env.PORT || config.serverport;
var users = {};
var salesRep = {};
//listen on every connection

io.on('connection', socket => {
	socket.on('new user', function(data) {
		console.log(`Socket ${socket.id} connected.`);
		socket.nickname = data.username;
		users[socket.nickname] = socket;
		console.log('new user==>' + socket.nickname);
		updatenames();
	});
	socket.on('new salesrep', function(data) {
		socket.nickname = data.username;
		salesRep[socket.nickname] = socket;
		console.log('new salesrep ==>' + socket.nickname);
		if (data.username in users) {
			users[data.username].emit('salesrep connected', {
				socket: data.username,
				nickname: socket.nickname
			});
		}
		socket.on('pointer', function(data) {
			socket.nickname = data.username;
			salesRep[socket.nickname] = socket;
			if (data.username in users) {
				users[data.username].emit('showPointer', {
					show: data.show,
					socket: data.username,
					nickname: socket.nickname,
					top: data.top,
					left: data.left
				});
			}
		});
	});

	function updatenames() {
		io.sockets.emit('NewClients', Object.keys(users));
	}
	socket.on('disconnect', function(data) {
		// console.log("disconnected");
		// console.log("sales resp diss ==> "+socket.nickname)
		console.log(`Socket ${socket.id} disconnected.`);
		if (!socket.nickname) return false;
		else {
			io.sockets.emit('ClientExit', {
				msg: data.message,
				nickname: socket.nickname,
				socket: data.name
			});
			// console.log("disconnected user==>"+socket.nickname);
			if (socket.nickname in salesRep && socket.nickname in users) {
				// console.log("========both are online========= now closed")
				var _data = {
					name: socket.nickname
				}; // adding to upadte user with softtoken update time in DB;
				// CheckLinkUtil.DBscreenSharingupdate(_data, false);
			}

			if (users[socket.nickname]) delete users[socket.nickname];
			else if (salesRep[socket.nickname]) delete salesRep[socket.nickname];
		}
	});
	//recive message from client
	socket.on('send HTMLmessage', function(data) {
		if (data) {
			console.log();
			if (data.name in users) {
				users[data.name].emit('new message', {
					msg: data.htmlContent,
					document: data.presentationType,
					nickname: socket.nickname,
					socket: data.name,
					isshowonline: data.Isonline,
					ishtml: true
				});
				// CheckLinkUtil.DBscreenSharingupdate(data, true);
			}
		}
	});
	socket.on('divScrolling', function(data) {
		if (data) {
			if (data.name in users) {
				console.log('scrolling evt');
				users[data.name].emit('Scrollingdivwithid', {
					msg: data,
					nickname: socket.nickname,
					socket: data.name
				});
			}
		}
	});
	socket.on('send message', function(data) {
		if (data) {
			if (data.name in users) {
				users[data.name].emit('new message', {
					msg: data.message,
					document: data.presentationType,
					nickname: socket.nickname,
					socket: data.name,
					isshowonline: data.Isonline
				});
				// CheckLinkUtil.DBscreenSharingupdate(data, true);
			}
		}
	});
});
http.listen(port, function() {
	console.log('listening on *:' + port);
});
