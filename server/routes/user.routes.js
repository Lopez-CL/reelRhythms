const userController = require('../controllers/user.controller');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { error } = require('console');
const verifyUpload = multer({
    storage: multer.memoryStorage(),
    limits: {fileSize: 5*1024*1024},
    fileFilter: function(req,file, cb){
        if(file){
            const fileType = /png|jpeg|jpg/
            const mimeType = fileType.test(file.mimetype);
            const extName = fileType.test(path.extname(file.originalname.toLocaleLowerCase()))
            if(mimeType && extName)return cb(null, true)
            return cb(new Error(`Issue with file verifcation. Please ensure file is of ${fileType} format and file size is 5MB or less`));
        }else{
            const defaultimgPath = path.join(__dirname, '../assets/defaultUser.png');
            req.file= {
                buffer: fs.readFileSync(defaultimgPath),
                mimetype: 'image/png',
                originalname: 'defaultUser.png'
            }
            return cd(null, true)
        }
    }
})

module.exports.app = app =>{
    app.post('/api/registerUser', verifyUpload.single('profImg'), userController.registerUser, (error, req,res, next)=>{
        if(error instanceof multer.MulterError){
            return res.status(401).res.josn({errMsg:"Issue with file upload"})
        }else if(error){return res.status(500).json({errMsg: 'server side issue on file upload'})}
    })
    app.get('/api/userLogin', userController.login)
    app.post('/api/updateUser', verifyUpload.single('profImg'), userController.updateUserData, (error, req,res, next) =>{
        if(error instanceof multer.MulterError){
            return res.status(401).res.josn({errMsg:"Issue with file upload"})
        }else if(error){
            return res.status(500).json({errMsg: 'server side issue on file upload'})}
    })
    app.get('/api/logut', userController.logOut)
}
