const mongoose = require('mongoose');

const img = new mongoose.Schema({
    filename : String,
    filepath : String,
    content : String
})
const PostSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    desc : {
        type : String,
        required : true
    },
    image : {
        type : String,
        // ref : 'img'
    },
    likes : {
        type : Number
    },
    comments : {
        type : String
    },
    logUser : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    }
    
})
module.exports = mongoose.model('Post', PostSchema);