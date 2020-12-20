const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const userModel = new Schema({
    username: {type: String},
    password: {type: String}
})

module.exports = mongoose.model('user',userModel);