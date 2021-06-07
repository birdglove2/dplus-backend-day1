const jwt = require('jsonwebtoken');

const currentUser = (req, res, next) => {
  if (!req.cookies.token) {
    return next(); // currentUser will be declared 'undefined'.
  }

  try {
    const user = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    req.currentUser = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = currentUser;
