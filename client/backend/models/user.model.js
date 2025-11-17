const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        minLength: [2, "Username must be two characters or more."],
        required: [true, 'Username required to create an account!'],
    },
    email:{
            type: String,
            unique: true, // what in terms of messaging can I do to communicate "account already exists"
            required: [true, "email required to create an account!"],
            validate: {validator: val => /^[\w.-]+@[\w.-]+\.\w+$/.test(val),
            message: "Invalid entry for eamil. Try again."}
    },
    password:{
        type: String,
        required: [true, "password required to create an account"],
        minLength: [8, "Passoword must be 8 characters of longer"]
    },
    profImg:{
        data: Buffer,
        mimetype: String
    }
}, 
{ timestamps: true });

//middleware and virtual field creation
UserSchema.virtual('confirmPassword')
    .get(function(){return this._confirmPassword})
    .set(function(val){ return this._confirmPassword = val})

    UserSchema.pre('validate', function(next){
    if(this.isModified('password')){
        if(this.password !== this.confirmPassword) this.invalidate("password","passwords do not match!")
    }
    next();
})
UserSchema.pre('save', async function(next){
    if(!this.isModified('password'))return next()
    try{
        const pwToHash = await bcrypt.hash(this.password, 12);
        this.password = pwToHash;
    }catch(err){
        console.log(err, "Issue with registration")
    }
    next();
})
UserSchema.virtual("filmCalendars",{
    ref: "FilmCalendar",
    localField: "_id",
    foreignField: "creatorID",
    justOne: false
})
UserSchema.set('toJSON', {virtuals:true})
UserSchema.set('toObject', {virtuals:true})
module.exports = mongoose.model("User", UserSchema);