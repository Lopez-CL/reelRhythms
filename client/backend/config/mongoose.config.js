const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/reelRythms_db")
    .then(()=> console.log("Established connection to the Reel Rhythms database!"))
    .catch(err => console.log(err, "Issue with connecting to database"))