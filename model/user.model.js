const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = require('../config/db');
const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
});
userSchema.pre('save', async function (next){
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error)
    }
});
userSchema.methods.comparePassword = async function (password){
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw(error);
    }
};

const userModel = db.model('User', userSchema);

module.exports = userModel;