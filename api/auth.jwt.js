require("dotenv").config(); 
const jwt = require("jsonwebtoken");
//// Using the secret from .env
const JWT_SECRET = process.env.JWT_SECRET;  

// Our new custom middleware
const authenticateToken = (req, res, next) => {

// Pull the Authorization header out of the headers
const authHeader = req.headers["authorization"];

// Get the token from it
const token = authHeader && authHeader.split(" ")[1];

// Send an error if no token
if(!token) {
    return res.status(401).json({ message: "Access Denied" });
}

// Verify the token using the secret
jwt.verify(token, JWT_SECRET, (err, userData) => {

    // Error, token did not validate
    if(err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }

    // Success and move on with the attached user data
    req.user = userData;
    next();

});

};

module.exports = authenticateToken;
