const express = require('express');
const router = express.Router();

require('./routes/user.routes')(router)
require('./routes/film.routes')(router)
require('./routes/filmCalendar.routes')(router)

module.exports = router;