const socketIo = require('socket.io');
const eventHandler = require('../game');
const lobbyController = require('../lobby');
const GAMESERVER = 'game';
const LOBBYSERVER = 'lobby server';


const socketServer = (app, server) => {
	const io = socketIo(server);

	app.set('io', io);

	io.on('connection', socket => {
			console.log('game client connected');
			socket.on('disconnect', data => {
					console.log('game client disconnected');
			});

			socket.on('chat message', function(msg) {
				console.log('Message:' + msg);
				socket.emit('chat message', msg);
			});

			socket.on('game', function(msg) {
			console.log('server received ', JSON.stringify(msg))
			eventHandler(msg, function(toPlayer, toGroup) {
					socket.emit('game', toPlayer);
					io.emit('game', toGroup);
				})
			});
	
			socket.on('game chat', function(msg) {
					console.log('server received ', JSON.stringify(msg));
					mockGameController(msg).then(ret => {	
						socket.emit(GAMESERVER, ret.player);
						io.sockets.emit(GAMESERVER, ret.group);
					}).catch( error => {
					console.log(error);
					});
			});
	});
}

module.exports = socketServer;
