import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const UserSchema = new mongoose.Schema({
    userName:{
        type: String,
        minLength: [2, "Username must be two characters or more."],
        required: [true, 'username required to create an account!'],
    },
    email:{
            type: String,
            required: [true, "email required to create an account!"],
            validator: val => /^([\w\-\.]+@([\w\-]+\.+[\w\-]+)$)/.test(val),
            message: "Invalid entry for eamil. Try again."
    },
    password:{
        type: String,
        required: [true, "password required to create an account"],
        minLength: [8, "Passoword must be 8 characters of longer"]
    },
    confirmPassword:{
        type: String,
        required: [true, "please confrim password"],
    },
    profImg:{
        type: Buffer
    }
}, 
{ timestamps: true });

//middleware and virtual field creation
UserSchema.pre('validate', function(next){
    if(this.password !== this._confirmPassword) this.invalidate("password","password do not match, back-end Error");
    next();
})
UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(val => this._confirmPassword = val);
UserSchema.pre('save', async function(next){
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
    localField: '_id',
    foreignField: "user",
    justOne: false
})
UserSchema.set('toObject', {virtuals: true})
UserSchema.set('toJSON',{virtuals:true})

module.exports = mongoose.Model('User', UserSchema);