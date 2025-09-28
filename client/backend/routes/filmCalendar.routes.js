const FilmCalendarController = require('../controllers/filmCalendar.controller');
const {authenticate} = require('../config/jwt.config');

module.exports = app =>{
    app.post('/api/filmCals/createfilmCal', authenticate, FilmCalendarController.createCalendar)
    app.get('/api/filmCals/getfilmCals', authenticate, FilmCalendarController.getAllFilmCalendars)
    app.get('/api/filmCals/filmCal/:_id', authenticate, FilmCalendarController.getAFilmCalendar)
}