const jwt = require('jsonwebtoken');

const protected = (req, res, next) => {
  const token = req.get('x-api-key');
  const secretKey = process.env.SECRET_KEY;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token is not valid' });
    }

    // If the token is valid, you can add the user data to the request object for later use
    req.user = decoded;

    next(); // Continue to the next middleware or route handler
  });
}

module.exports = {
    protected
}