const path = require("path");
const fs = require('fs');
module.exports.ensureDefaultImg = (req, res, next) =>{
    if(!req.file){
        const defaultimgPath = path.join(__dirname, '../assets/defaultUser.png')
            req.file= {
                buffer: fs.readFileSync(defaultimgPath),
                mimetype: 'image/png',
                originalname: 'defaultUser.png'
            }
        next()
    }
    }
        