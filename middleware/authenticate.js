const jwt = require('jsonwebtoken');
require('dotenv').config()


const JWT_SECRET = process.env.JWT_TOKEN

function auth (req, res, next) {
    const token = req.header('auth-token');
    if(!token)
    {
        return res.status(400).json("Incorrect Credetials")
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user
        next();
    } catch (error) {
        console.error("Error", error.message);
        return res.status(400).json("internal server error");
    }
}
module.exports = auth;