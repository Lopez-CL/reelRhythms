const express = require('express');
const next = require('next');
const multer = require('multer');
const upload = multer();
// const cors =  require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({dev});
const handle = nextApp.getRequestHandler();
nextApp.prepare().then(()=>{
    const app = express();
    const PORT = process.env.PORT || 8000;
    app.use(express.json(), express.urlencoded({extended: true}));
    app.use(upload.none())
    app.use(cookieParser())
    const backendRouter = require('./backend');
    app.use('/backend', backendRouter);
    // app.use(cors({
    // origin: 'http://localhost:3000',
    // credentials: true
    // }))
    require('./backend/config/mongoose.config');
    // require('./backend/routes/user.routes')(app)
    // require('./backend/routes/filmCalendar.routes')(app);
    // require('./backend/routes/film.routes')(app)
    app.use(require('./backend/utilities/pageAuth'))
    app.use((req, res)=>{
    return handle(req, res);
    })
    app.listen(PORT, ()=> console.log(`Listening http://localhost:${PORT}`));
})