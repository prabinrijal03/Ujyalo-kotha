const mongoose = require('mongoose');
const db = require('../config/db');

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    details:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: Number,
        required: true
    }
});
const postModel = db.model('Post', postSchema);
module.exports = postModel;