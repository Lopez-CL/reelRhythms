const jwt = require('jsonwebtoken')
const KEY = process.env.APP_KEY;

module.exports.authenticate = (req, res, next) =>{
    const token = req.cookies.userToken;
    if(!token) return res.status(401).json({error: "Unable able to identify token"})
    jwt.verify(token, KEY, (err, payload)=>{
        if(err)return res.status(401).json({err, verififed: false})
        req.user = payload;
        next()
    })
}