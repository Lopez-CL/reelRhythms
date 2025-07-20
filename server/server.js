const express = require('express');
const app = express();
const cors =  require('cors');
const cookieParser = require('cookie-parser');
const MYPORT = 8000;

require('./config/mongoose.config')
require('dotenv').config()

app.use(express.json(), express.urlencoded({extended: true}));
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost3000:',
    credentials: true
}))

app.listen(MYPORT, ()=> console.log(`Listing on ${MYPORT}`));