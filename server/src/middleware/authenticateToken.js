const jwt = require('jsonwebtoken');

// const authenticateToken = (req, res, next) => {
//   const token = req.header('Authorization')?.split(' ')[1]; // Get token from Authorization header

//   if (!token) {
//     return res.status(403).json({ error: 'No token provided' });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403); // Token is not valid

//     req.user = user; // Attach the user info (user.id, user.email) to the request
//     next(); // Proceed to the next middleware (i.e. your controller)
//   });
// };


const authenticateToken = (req, res, next) => {
    // Check if the Authorization header contains a Bearer token
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    
    if (!token) {
        return res.status(403).json({ error: 'Token is required' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token is invalid' });
        }
        req.user = user; // Store the user information from the token
        next(); // Proceed to the next middleware or route handler
    });
}

module.exports = authenticateToken;
