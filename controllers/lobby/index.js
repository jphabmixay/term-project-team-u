const Users=require('../../models/users');
const Games=require('../../models/games');
const Players=require('../../models/players');
const Messages=require('../../models/messages');
const MaxPlayer = 4;

function lobby(msg)
{

return new Promise( function(fulfill, reject){
	switch(msg.action)
{
case "create_game":
	console.log(msg.email + ' created a new game');
	

Users.findByEmail(msg.email).then( user => {
	console.log(user.id);
	
Games.create(user.id).then( game => {
console.log(game.id);
 
console.log(user.id);
	
var player = {
	game_id: game.id,
 user_id: user.id,
 seat_number: 0,
};

Players.create(player).then( player => {
console.log(player);
 
Games.listJoinables().then( games=> {
 var toPlayer =	{game_id: game.id, action: "enter_gameroom"};
				var toGroup = {games: games, action:"update_games"};
				fulfill({player:toPlayer, group:toGroup});
				}).catch( error => {
					games={};
					var msg={games: games, action:"update_games"};
					reject({player:msg, group:msg});
				});
			
				}).catch(error => {
					console.log(error);
					reject(error);
				});
		
				}).catch( error => {
					console.log(error);
					reject(error);
				});
			
				}).catch( error => {
					console.log(error);
					reject(error);
				});
			break;
	case "join_game":
		Users.findByEmail(msg.email).then( user => {
			console.log("join_game");
			console.log(msg.game_id);
			console.log(user.id);
			Games.findById(msg.game_id).then( game => {
				console.log(game);
				var player = {
					game_id: game.id,
					user_id: user.id,
				};
				Games.addPlayer(player).then( pl => {
					console.log(pl);
					Games.listJoinables().then( games=> {
						console.log(games);
 
						var toPlayer = {game_id: game.id, action: "enter_gameroom"};

						var toGroup = {games: games, action:"update_games"};

						fulfill({player:toPlayer, group:toGroup});
					});
			});
		});
 	}).catch(error => {
	console.log(error);
			reject(error);
		});

		break;
	case "send_chat":
			
		Users.findByEmail(msg.email).then( user => {
			Messages.create({game_id:msg.game_id, user_id:user.id, message: msg.message}).then( success => {
				Messages.listLobbyMsg().then( msgs => {
					console.log(msgs);
					var toPlayer = {messages: msgs, action: "update_chat"};
					var toGroup = {messages: msgs, action: "update_chat"};
					fulfill({player:toPlayer, group:toGroup});
				});
			});
		}).catch(error => {
			console.log(error);
			reject(error);
		});
		break;
	}
	});
}

module.exports = lobby;
