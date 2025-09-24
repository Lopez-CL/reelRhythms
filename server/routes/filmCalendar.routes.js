const FilmCalendarController = require('../controllers/filmCalendar.controller');
const {authenticate} = require('../config/jwt.config');

module.exports = app =>{
    app.post('/api/createfilmCal', authenticate, FilmCalendarController.createCalendar)
    app.get('/api/getfilmCals', authenticate, FilmCalendarController.getAllFilmCalendars)
    app.get('/api/filmCal/:_id', authenticate, FilmCalendarController.getAFilmCalendar)
}