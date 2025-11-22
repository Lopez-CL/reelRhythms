const userController = require('../controllers/user.controller');
const path = require('path');
const multer = require('multer');
const {ensureDefaultImg} = require('../utilities/defaultAvatar');
const verifyUpload = multer({
    storage: multer.memoryStorage(),
    limits: {fileSize: 5*1024*1024},
    fileFilter: function(req,file, cb){
    console.log("📸 fileFilter triggered, file:", file?.originalname);
    const allowed = /png|jpe?g/i;
    const ok = allowed.test(file.mimetype) && allowed.test(path.extname(file.originalname));
    return ok ? cb(null, true) : cb(new Error("Invalid file type"));
    }
})

module.exports = router => {
    router.post('/api/users/register', (req, res, next) => {
    console.log("🔥 ROUTE REACHED (before multer)");
    next();
    });
    router.post('/api/users/register',
        verifyUpload.single('profImg'),
        ensureDefaultImg,
        userController.registerUser
    );

    router.get('/api/users/login', userController.login);

    router.put('/api/users/updateUser/:_id',
        verifyUpload.single('profImg'),
        ensureDefaultImg,
        userController.updateUserData
    );

    router.get('/api/users/logout', userController.logOut);
    router.get('/api/users/getUser/:_id', userController.getUser);
    router.get('/api/users/getAvatar/:_id', userController.getUserAvatar);

    // Global multer/server error handler
    router.use((err, req, res, next) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: "Multer error", detail: err.message });
        }
        if (err) {
            return res.status(500).json({ error: "Server error", detail: err.message });
        }
        next();
    });
}