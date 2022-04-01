/*
 Create and export the model
 ***** By singou Dembele **********
*/


var mongoose = require('mongoose');

bookSchema = mongoose.Schema({
    title: String,
    subtitle: String,
    description: String,
    author: String,
    scope: String,
    publisher: String,
    available: Boolean
});

bookModel = mongoose.model('Book',bookSchema);

module.exports = bookModel;