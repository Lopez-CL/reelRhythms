const {Types, model, Schema} = require('mongoose');
const UserAndFilmCalJoinSchema = new Schema({
    user:{type: Types.ObjectId, ref:'User', required: true},
    filmCalendar:{type: Types.ObjectId, ref:'FilmCalendar', required: true}
}, {timestamps:true});

UserAndFilmCalJoinSchema.index({ user: 1, filmCalendar: 1 }, { unique: true });
module.exports = model('UserAndFilmCalJoin', UserAndFilmCalJoinSchema);