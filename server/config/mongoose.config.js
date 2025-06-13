const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/users_db',{
    useNewUrlParser: true,
    useUnifiedTypology: true
})
.then(()=> console.log("Established connection to database"))
.catch(err=> console.log(err, "Issue connecting with data base"))