var mongoose = require('mongoose');
var blogSchema = mongoose.Schema({
    name: String,
    createdOn: Date,
    updateOn: Date,
    author: String,
    comments: String,
    likes: Number
})

/*var blogSchema = new schema({
    name: String,
    createdOn: Date,
    updateOn: Date,
    author: String,
    comments: String,
    likes: Number
})*/

module.exports = mongoose.model('Blog',blogSchema)
