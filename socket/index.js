const socketIo = require('socket.io');
const session = require('express-session');
const bcrypt = require('bcrypt');
const cookie = require('cookie');

var io;

const init = (server) => {
    io = socketIo(server);
    app.set('io', io);
};

module.exports = { init }