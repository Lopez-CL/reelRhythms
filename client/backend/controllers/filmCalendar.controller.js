const FilmCalendar = require("../models/filmCalendar.model")

module.exports.createCalendar = async (req,res)=>{
    const {title, seasons, films, details, creatorId} = req.body
    try{
        const newFilmCal = await FilmCalendar.create({title, seasons, films, details, creatorId})
        const popFilmCal = await FilmCalendar.findById(newFilmCal._id).populate([
            {path: 'creatorId', select: 'username'},
            {path: 'films.film', select: 'title'}
        ])
        res.status(201).json({popFilmCal});
    }catch(error){
        res.status(400).json({error: "Issue with creating film calendar."})
    }
    
}

module.exports.getAllFilmCalendars = async (req, res) =>{
    try{
        const allFilmCals = await FilmCalendar.find().populate('creatorId', 'username').lean()
        res.status(200).json({allFilmCals})
    }catch(err){
        res.status(500).json({err: "Issue with fetching all film calendars"})
    }
}

module.exports.getAFilmCalendar = async (req,res) =>{
    const {_id} = req.params;
    try{
        const foundFilmCal = await FilmCalendar.findById(_id).populate([
            {path: 'creatorId', select: 'username'},
            {path: 'films.film', select: 'title'}
        ]).lean();
        res.status(201).json(foundFilmCal);
    }catch(err){
        res.status(401).json({err:"Unable to fetch FilmCalendar"});
    }
}