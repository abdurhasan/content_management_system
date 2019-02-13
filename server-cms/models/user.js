const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_I = 10;
require('dotenv').config();

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required: true,
        trim: true,
        unique: 1
    },
    password:{
        type:String,
        required: true,
        minlength: 5
    },
    name:{
        type:String,
        required: true,
        maxlength:100
    },   
    role:{
        type:Number,
        default:0
    }
    
});

userSchema.pre('save',function(next){
    var user = this;            
    bcrypt.hash(user.password,SALT_I,function(err,hash){
        if(err) return next(err);
        user.password = hash;
        next();
    });                 
})

userSchema.methods.comparePassword = function(candidatePassword,cb){
    let actualPassword = this.password
    bcrypt.compare(candidatePassword,actualPassword,function(err,isMatch){
        if(err) return cb(err);
        cb(null,isMatch,actualPassword)
    })
}





const User = mongoose.model('User',userSchema);

module.exports = { User }