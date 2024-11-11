const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const auth = (req, res, next) =>{
    const token = req.header('Authorization')?.split(' ')[1];
    
    if(!token){
        return req.status(401).json({ message: 'Access denied. No token provided.'});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch (error){
        res.status(400).json({ message: 'Invalid token.'});
    }
};

module.exports = auth;