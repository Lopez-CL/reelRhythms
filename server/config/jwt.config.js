const jwt = require('jsonwebtoken')
const KEY = process.env.APP_KEY;

module.exports.authenticateUser = (req, res, next) =>{
    const token = req.cookies.userToken;
    if(!token) return res.status(401).json({msg: "Unable to locate authenticating item"});
    jwt.verify(token, KEY, (err, payload)=>{
        if(err) return res.status(401).json({verified: false})
        req.user = payload;
        next();
    })
}