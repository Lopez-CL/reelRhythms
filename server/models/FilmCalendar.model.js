const {Types, Schema, model} = require('mongoose');
const FilmRefSchema = new Schema({
    film:{
        type: Types.ObjectId,
        ref: 'Film',
        required: true
    },
    watchDate:{
        type: Date,
        required: true
    }
},{ _id: false})

const FilmCalendarSchema = new Schema({
    title:{
        type: String,
        require: true,
    },
    seasons:{
        type: [String],
        required: true
    },
    films:{
        type:[FilmRefSchema], 
        default:[]
    },
    details:{
        type: String,
        required: false,
        maxlength:[250, "You calendar details cannot be more than 250 characters"]
    },
    creatorID:{
        type: Types.ObjectId,
        ref: "User",
    }
}, {timestamps: true})

FilmCalendarSchema.index({'films.film':1});
FilmCalendarSchema.index({'films.film':1, 'films.watchDate':1});
FilmCalendarSchema.index({'films.watchDate':1});
FilmCalendarSchema.index({'creatorID':1})

module.exports = model("FilmCalendar", FilmCalendarSchema);

