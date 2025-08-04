const User = require("../models/user.model");
const KEY = process.env.APP_KEY;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.registerUser = (async (req,res )=>{
    const {userName, email, password, confirmPassword} = req.body;
    try{
        const newUser = await User.create({
            userName,
            email,
            password,
            confirmPassword,
            profImg: req.file.buffer
        })
        const userToken = jwt.sign({userEmail: newUser.email, _id: newUser._id}, KEY, {expiresIn:'2h'})
        if(newUser.profImg?.data && newUser.password ){
            let userObj = newUser.toObject();
            userObj.profImg = Buffer.from(newUser.profImg.data).toString('base64');
            delete userObj.password;
            res.status(201).cookie('userToken', userToken, {httpOnly: true, maxAge: 1000 * 60 * 120}).json({userData: userObj})
        }else{
            res.status(500).json({err:"Issue with mutating user data for response"})
        }
    }catch(err){
        res.status(400).json({err: "Invalid login credentials"});
    }
})

module.exports.login = async (req, res)=>{
    const {email, password} = req.body;
    const foundUser = await User.findOne({email});
    if(!foundUser) res.status(400).json({err: "Invalid login credentials"});
    try{
        const pwCheck = await bcrypt.compare(foundUser.password, password)
        if(!pwCheck) res.status(400).json({err: "Invalid login credentials"});
        const userToken = jwt.sign({_id: foundUser._id, email: foundUser.email}, KEY,{expiresIn:'2hr'});
        if(foundUser.profImg?.data && foundUser.password){
            let userObj = foundUser.toObject();
            userObj.profImg = Buffer.from(foundUser.profImg.data).toString('base64');
            delete userObj.password;
            res.status(201).cookie('userToken', userToken, {httpOnly: true, maxAge: 1000 * 60 *120}).json({userData: userObj});
        }else{
            res.status(500).json({err:"Issue with mutating user data for response"})
        }
    }catch(err){
        res.status(400).json({err: "Invalid login credentials"});
    }
}

module.exports.updateUserData = async (res, req) =>{
    const {_id} = req.body;
    try{
        const updatedUser = await User.findOneAndUpdate({_id}, req.body, {runValidators: true, new: true});
        if(updatedUser?.profImg && updatedUser.password){
            let updatedUserObj = updatedUser.toObject();
            updatedUserObj.profileImage = Buffer.from(updatedUser.profImg.data).toString('base64');
            delete updatedUser.password
            res.status(201).json({userData:updatedUserObj});
        }else{
            res.status(500).json({errMsg: "Issue with mutating user data for response"})
        }
    }catch(err){
        res.status(401).json({err:"Update failed."});
    }
}

module.exports.logOut = (res, req) =>{
    res.clearCookie("userToken");
    res.json({msg: "user logged out and cookies cleared"})
}