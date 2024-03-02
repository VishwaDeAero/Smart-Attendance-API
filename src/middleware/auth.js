const jwt = require('jsonwebtoken');

const protected = (requiredRoles) => async (req, res, next) => {
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

    // Check if the user's role has permission to access the route
    const userRole = req.user.Role.name;
    if (!requiredRoles.includes(userRole)) {
      return res.status(403).json({ error: 'Access forbidden' });
    }

    next(); // Continue to the next middleware or route handler
  });
};


const studentOnly = (req, res, next) => {
  const token = req.get('x-api-key');
  const secretKey = process.env.STUDENT_SECRET_KEY;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token is not valid' });
    }

    // If the token is valid, you can add the student data to the request object for later use
    req.student = decoded;

    next(); // Continue to the next middleware or route handler
  });
}

module.exports = {
  protected,
  studentOnly
}