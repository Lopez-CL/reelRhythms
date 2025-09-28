const User = require('../models/user.model');
const KEY = process.env.APP_KEY;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.registerUser = async (req,res )=>{
    const {username, email, password, confirmPassword} = req.body;
    try{
        const newUser = await User.create({
            username,
            email,
            password,
            confirmPassword,
            profImg: {
                data: req.file.buffer,
                mimetype: req.file.mimetype
            }
        })
        const userToken = jwt.sign({userEmail: newUser.email, _id: newUser._id}, KEY, {expiresIn:'2h'})
        if(newUser.profImg && newUser.password ){
            let userObj = newUser.toObject();
            userObj.imageUrl = `${req.protocol}://${req.get('host')}/api/users/getAvatar/${newUser._id}`
            delete userObj.password, delete userObj.profImg, delete userObj.confirmPassword, delete userObj.id;
            res.status(201).cookie('userToken', userToken, {httpOnly: true, maxAge: 1000 * 60 * 120}).json({userData: userObj})
        }else{
            res.status(500).json({err:"Issue with mutating user data for response"})
        }
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

module.exports.login = async (req, res)=>{
    const {email, password} = req.body;
    const foundUser = await User.findOne({email});
    if(!foundUser) return res.status(400).json({err: "Invalid login credentials"});
    try{
        const pwCheck = await bcrypt.compare(password, foundUser.password)
        if(!pwCheck) res.status(400).json({err: "Invalid login credentials"});
        const userToken = jwt.sign({_id: foundUser._id, email: foundUser.email}, KEY,{expiresIn:'2hr'});
        if(foundUser.profImg && foundUser.password){
            let userObj = foundUser.toObject();
            userObj.imgUrl = `${req.protocol}://${req.get('host')}/api/users/getAvatar/${foundUser._id}`
            delete userObj.password, delete userObj.profImg, delete userObj.confirmPassword, delete userObj.id;
            res.status(201).cookie('userToken', userToken, {httpOnly: true, maxAge: 1000 * 60 *120}).json({userData: userObj});
        }else{
            res.status(500).json({err:"Issue with mutating user data for response"})
        }
    }catch(err){
        res.status(400).json({err: "Invalid login credentials"});
    }
}

// module.exports.getUsers = async (req,res) =>{
//     try{

//     }catch(err){

//     }
// }

module.exports.updateUserData = async (req, res) =>{
    const {_id} = req.params
    try{
        const updatedUser = await User.findOneAndUpdate({_id}, req.body, {runValidators: true, new: true}).populate('filmCalendars');
        if(updatedUser?.profImg && updatedUser.password){
            let updatedUserObj = updatedUser.toObject();
            userObj.imgUrl = `${req.protocol}://${req.get('host')}/api/users/getAvatar/${foundUser._id}`
            delete userObj.password, delete userObj.profImg, delete userObj.confirmPassword, delete userObj.id;
            res.status(201).json({userData:updatedUserObj});
        }else{
            res.status(500).json({errMsg: "Issue with mutating user data for response"})
        }
    }catch(err){
        res.status(401).json({err:"Update failed."});
    }
}

module.exports.getUser = async (req,res) =>{
    const foundUser = await User.findById(req.params._id).select('_id username').populate({path:'filmCalendars', select: 'title seasons'})
    try{
        if(!foundUser) return res.status(404).json({err:"No user was found"})
        const userObj = foundUser.toObject();
        foundUser.imgUrl = `${req.protocol}://${req.get('host')}/api/users/getAvatar/${foundUser._id};`
        res.status(201).json(userObj);
    }catch(err){
        res.status(500).json({err: "Unable to fetch user!"})
    }
}

module.exports.getUserAvatar = async (req,res) =>{
    try{
        const user = await User.findById(req.params._id).select("profImg");
    if(!user?.profImg) return res.status(404).json({err: "Unable to fetch user"})
        res.set("Content-Type", user.profImg.mimetype)
    res.send(user.profImg.data)
    }catch(err){
        res.status(500).json({err: "Issue with fetching image data"});
    }
}

module.exports.logOut = (res, req) =>{
    res.clearCookie("userToken");
    res.json({msg: "user logged out and cookies cleared"})
}