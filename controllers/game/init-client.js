const access = require('../../models/game/access')

const initClient = (toPlayer) => {

  access.cards().then(result => {
    cards = result
    Object.assign(toPlayer, { cardsTable: cards })
  })
  .catch( e => {
    console.log(e)
  })

}

module.exports = initClient
