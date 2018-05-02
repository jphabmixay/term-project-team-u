const bcrypt = require('bcrypt');
const db = require('./index');

const CREATE_QUERY =
  'INSERT INTO users (email, hash) VALUES (${email}, ${hash}) RETURNING id, email';
const create = (email, password) =>
  bcrypt.hash(password, 10).then(hash => db.one(CREATE_QUERY, { email, hash }));

const find = email =>
  db.one('SELECT * FROM users WHERE email=${email}', { email });

const serialize = (user, done) => {
  console.log('serialize', user);
  done(null, user.id);
};

const deserialize = (id, done) => {
  console.log('deserialize', id);
  db
    .one('SELECT * FROM users WHERE id=${id}', { id })
    .then(({ id, email }) => done(null, { id, email }))
    .catch(error => done(error));
};
module.exports = {
  create,
  find,
  serialize,
  deserialize
};