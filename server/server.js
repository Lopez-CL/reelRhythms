const express = require('express');
const app = express();
const cors =  require('cors');
const cookieParser = require('cookie-parser');
const MYPORT = 8000;
require('dotenv').config()

app.use(express.json(), express.urlencoded({extended: true}));
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
require('./config/mongoose.config')
require('./routes/user.routes')(app)
require('./routes/filmCalendar.routes')(app)
require('./routes/film.routes')(app)

app.listen(MYPORT, ()=> console.log(`Listening on ${MYPORT}`));