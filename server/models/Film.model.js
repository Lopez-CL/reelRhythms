const {Schema} = require('mongoose')
const mongoose = require('mongoose')
const FilmSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    iMDB_ID:{
        type: String,
        required: true
    }
}, {timestamps:true})

module.exports = mongoose.model('Film', FilmSchema);