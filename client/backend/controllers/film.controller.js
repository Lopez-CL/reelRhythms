const filmModel = require('../models/film.model');
const FILM_KEY = process.env.OMBD_KEY;
const OMBD_URL = `https://www.omdbapi.com/?apikey=${FILM_KEY}`
module.exports.addFilm = async (req, res)=>{
    const {title, iMDB_ID} = req.body;
    try{
        filmModel.create({title, iMDB_ID})
        res.status(201).json({msg: "film added"});
    }catch(error){
        res.status(401).json({error: "Unable to add film"});
    }
}

module.exports.getAfilm = async (req, res) => {
        const {iMDB_ID} = req.params
    try{
        const film = await filmModel.findOne({iMDB_ID});
        let fullURL = `${OMBD_URL}&i=${film.iMDB_ID}`;
        const data = await fetch(fullURL);
        const filmObj = await data.json();
        if(filmObj) return res.status(201).json(filmObj)
    }catch(error){
        res.status(401).json({error:"unable to fetch film data"});
    }
}