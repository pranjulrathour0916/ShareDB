const { default: mongoose } = require('mongoose')
const mongo = require('mongoose')

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
})
const User = mongoose.model('users', UserSchema)
module.exports = User;