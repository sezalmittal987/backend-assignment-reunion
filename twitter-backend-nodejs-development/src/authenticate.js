const jwt = require('jsonwebtoken')

const userAuth = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.status(401).json({"message" : "Authentication failed!"});
  }
  jwt.verify(token, 'eventman', (err, user) => {
    if (err) {
        return res.status(401).json({"message" : "Authentication failed!"});
    }
    req.user = user;
    next();
  });
};

module.exports = userAuth;