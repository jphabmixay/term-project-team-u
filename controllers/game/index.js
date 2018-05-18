const access = require('../../models/game/access.js')
const ready = require('./ready')
const start = require('./start')
const initClient = require('./init-client')
const playCards = require('./play-cards')
const refreshClient = require('./refreshClient')
const TO_PLAYER = { order:{}, user_id:{}, game_state:{}, handCards:{} }
const TO_GROUP = { group:{}, refresh:{}, game_state:{}, players:{}, game:{}, cardsInPlayers:{} }

const eventHandler = (msg, callback) => {
  var toPlayer = Object.assign({}, TO_PLAYER)
  var toGroup = Object.assign({}, TO_GROUP)
  var promises = []

  toPlayer.user_id = msg.user_id
  toGroup.group = msg.game_id
  handleEvent(msg, toPlayer, toGroup).then( () => {
    // read data from the updated tables and assemble send out packages
    promises = [access.cardsInHand(msg.game_id, msg.user_id)
                , access.thisGame(msg.game_id)
                , access.playersThisGroup(msg.game_id)
                , access.cardsInPlayers(msg.game_id)]
    return Promise.all(promises)
  })
  .then(values => {
    toPlayer.handCards = values[0]
    toGroup.game = values[1]
    toGroup.players = values[2]
	console.log(toGroup.players);
    toGroup.cardsInPlayers = values[3]
    packOutPackage(msg, toPlayer, toGroup)
    return delay(50)
  .then(() => {
    callback(toPlayer, toGroup)
  })
  .catch( e => {
    console.log('error from eventHandler', e)
  })
 })              
}

function handleEvent(msg, toPlayer, toGroup) {
  const word = msg.word
  var promise;
  console.log(word)
  if (typeof word === 'number' || word === 'draw') {
    promise = playCards(msg)
    result = 'get number'
  }
  switch (word) {
    case 'draw':
      result = 'get draw'
      break
    case 'ready':
      ready(msg).then( result => {
      if (result) {
		result="start game";
        toGroup.refresh = 'refresh'
        promise = start(msg)
      } else {
        result = 'not ready to start';
      }

      toGroup.refresh = 'refresh'
	  });

      break
    case 'init':
      result = 'get init'
      initClient(toPlayer)
      break
    case 'exit':
      result = 'get exit'
      exit(msg)
      break
    default:
      result = 'no matched word'
  }
  return promise || new Promise((resolve) => {resolve()});
}

const wordMapOrder = word => {
  switch (word) {
    case 'refresh':
      result = 'redraw'
      break
    case 'draw':
      result = 'settle'
      break
    case 'ready':
      result = 'refresh'
      break;
    case 'init':
      result = 'init'
      break;
    case 'exit':
      result = 'exit'
      break
    case 'send_chat':
      result = 'uppate_chat'
      break
    default:
      result = 'none'
  }
  return result
}

function setRefreshFlag(word) {
  var result
  switch (word) {
    case 'ready':
    case 23:
    case 24:
    case 48:
    case 49:
    case 73:
    case 74:
    case 98:
    case 99:
    case 104:
    case 105:
    case 106:
    case 107:
      result = 'refresh'
      break
    default:
      result = {}
  }
  return result
}

function packOutPackage(msg, toPlayer, toGroup) {
  
  if (toPlayer.handCards.length===0 && toGroup.cardsInPlayers.length>0){
  	toGroup.winner=msg.user_id;
  }
  toPlayer.user_id = msg.user_id
  toPlayer.order = wordMapOrder(msg.word)
  toGroup.refresh = setRefreshFlag(msg.word)
  toGroup.group = msg.game_id
  if (toGroup.game.length > 0) {
    toGroup.game_state = toGroup.game[0].game_state
    toPlayer.game_state = toGroup.game[0].game_state
  }
}

function delay(t) {
   return new Promise(function(resolve) { 
       setTimeout(resolve, t)
   })
}

function win_condition(hand_size) {
   return new Promise(function(resolve) {
        var score=0;
        var count=0;
        if(hand_size===0){
        toGroup.cardsInPlayers.forEach(card => {
          score+=card.point;
		  count++;
          if(toGroup.cardsInPlayers.length === count)
			 resolve(score);
   	     });
		}else{
			 resolve(0);
		}
   })
}

module.exports = eventHandler

