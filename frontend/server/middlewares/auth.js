const jwt = require('jsonwebtoken');
const fs = require('fs');

const publicKEY  = fs.readFileSync('./public.key', 'utf8');


function checkTokenSetUser(req, res, next) {
  const authHeader = req.get('Authorization');
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    if (token && token !== 'null') {
      jwt.verify(token, publicKEY, { algorithms: ['RS256'] }, (err, user) => {
        if (err) {
          const error = new Error('🚫 Token verify fails 🚫: ' + err);
          res.status(401);
          next(error);
        }
        req.user = user;
        next();
      });
    } else {
      const error = new Error('🚫 token null: ', token)
      res.status(401);
      next(error);
    }
  } else {
    next();
  }
}

function isLoggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    const error = new Error('🚫 Un-Authorized - not logged in 🚫');
    res.status(401);
    next(error);
  }
}

module.exports = {
  checkTokenSetUser,
  isLoggedIn
};