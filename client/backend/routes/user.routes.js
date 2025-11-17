const userController = require('../controllers/user.controller');
const path = require('path');
const multer = require('multer');
const {ensureDefaultImg} = require('../utilities/defaultAvatar');
const verifyUpload = multer({
    storage: multer.memoryStorage(),
    limits: {fileSize: 5*1024*1024},
    fileFilter: function(req,file, cb){
        if(file){
            const fileType = /png|jpe?g|/
            const mimeTypeOK = fileType.test(file.mimetype);
            const extNameOK = fileType.test(path.extname(file.originalname.toLowerCase()))
            if(mimeTypeOK && extNameOK)return cb(null, true)
            return cb(new Error(`Issue with file verifcation. Please ensure file is of ${fileType} format and file size is 5MB or less`));
        }
    }
})

module.exports = app =>{
    app.post('/api/users/register', verifyUpload.single('profImg'), ensureDefaultImg, userController.registerUser, (error, req,res, next)=>{
        if(error instanceof multer.MulterError){
            return res.status(401).res.josn({errMsg:"Issue with file upload"})
        }else if(error){return res.status(500).json({errMsg: 'server side issue on file upload'})}
    })
    app.get('/api/users/login', userController.login)
    app.put('/api/users/updateUser/:_id', verifyUpload.single('profImg'),ensureDefaultImg, userController.updateUserData, (error, req,res, next) =>{
        if(error instanceof multer.MulterError){
            return res.status(401).json({errMsg:"Issue with file upload"})
        }else if(error){
            return res.status(500).json({errMsg: 'server side issue on file upload'})}
    })
    app.get('/api/users/logout', userController.logOut)
    app.get('/api/users/getUser/:_id', userController.getUser)
    app.get('/api/users/getAvatar/:_id', userController.getUserAvatar)
}
