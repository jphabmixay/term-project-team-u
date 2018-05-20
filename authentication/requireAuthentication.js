const requireAuthentication = (request, response, next) => {
  if (request.isAuthenticated()) {
    return next();
  } else {
    response.redirect('/users/login');
  }
};

module.exports = requireAuthentication;