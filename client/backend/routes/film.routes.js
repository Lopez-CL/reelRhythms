const FilmController = require('../controllers/film.controller');
const {authenticate} = require('../config/jwt.config');
module.exports = app =>{
    app.post('/api/films/search', authenticate, FilmController.searchFilms);
    app.post('/api/films/addFilm', authenticate, FilmController.addFilm);
    app.get('/api/films/getFilm/:iMDB_ID', authenticate, FilmController.getAfilm);
}