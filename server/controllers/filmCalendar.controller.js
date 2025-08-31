const FilmCalendar = require("../models/FilmCalendar.model");
const UserAndFilmCalJoin = require("../models/UserAndFilmCal.model");

module.exports.createCalendar = async (req,res)=>{
    const {title, season, films, details} = req.body
    try{
        const newFilmCal = await FilmCalendar.create({title, season, films, details})
        const creatorId = req.user?._id
        await UserAndFilmCalJoin.updateOne({user: creatorId, filmCalendar: newFilmCal._id},
            {$setOnInsert: {user: creatorId, filmCalendar: newFilmCal._id}},
            {upsert:true}
        );
        const populated = await FilmCalendar.findById(newFilmCal._id).populate('films.film', 'title iMBD_ID').lean();
        res.status(201).json({populated});
    }catch(error){
        res.status(400).json({error: "Issue with creating film calendar."})
    }
    
}

module.exports.getAllFilmCalendars = async (req, res) =>{
    try{
            const allFilmCals = await FilmCalendar.find() // If I wanted films of filmCalendar.populate('films.film', 'title iMBD_ID').lean();
            res.status(200).json({allFilmCals});
    }catch(err){
        res.status(500).json({err: "Issue with fetching all film calendars"})
    }
}