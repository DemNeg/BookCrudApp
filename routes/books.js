/*
 Create books module and process incoming requests and perform CRUD operations
 ***** By singou Dembele **********
*/

var express = require('express');
var router = express.Router();
var bookModel = require('../models/book.model')


/* ADD book . */
router.post('/addBook', function(req, res, next) {

    let newBook = new bookModel({
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
        author: req.body.author,
        scope: req.body.scope,
        publisher: req.body.publisher,
        available: req.body.available
    });
    newBook.save((err, book) => {
        if (err) {
            res.send(err);
        }else {
            res.send({status: 'success', data: book})
        }
    })

});


  //GET a book that much a particular condition
router.get('/getBook',(req, res, next) => {

    const keyword = req.query.title

    bookModel.find({title:keyword},(err, book) => {
        if (err) {
            res.send(err);
        }else {
            res.send({status: 'success', data: book})
        }
    });
});

//GET a book by _id
router.get('/getBookById',(req, res, next) => {

        const inputId = req.query.id
    
        bookModel.findById({_id:inputId},(err, book) => {
            if (err) {
                res.send(err);
            }else {
                res.send({status: 'success', data: book})
            }
        });
  });
    
  
/* GET books all books. */
router.get('/', function(req, res, next) {

    bookModel.find((err, books) => {
        if (err) {
            res.send(err);
        }else {
            res.send({status: 'success', data: books})
        }
    })
});

/* UPDATE a book that match a particular criteria*/
router.put('/updateBook',(req, res, next)=>{
    
    const newDescription= req.query.description;
    const keyword= req.query.available;

    bookModel.update({available:keyword},{description:newDescription},(err, book) => {
        if (err) {
            res.send(err);
        }else {
            res.send({status: 'success', data: book});
        }
    });
});

/* UPDATE the first book document that match a particular criteria*/
router.put('/updateFirstBook',(req, res, next)=>{
    
    const newDescription= req.query.description;
    const keyword= req.query.available;

    bookModel.findOneAndUpdate({available:keyword},{description:newDescription},(err, book) => {
        if (err) {
            res.send(err);
        }else {
            res.send({status: 'success', data: book});
        }
    });
});

/* REMOVE the first book document that match a particular criteria */
router.delete('/deleteFirstBook',(req, res, next)=>{

    const keyword= req.query.available;

    bookModel.findOneAndRemove({available:keyword},(err, book) => {
        if (err){
            res.send(err);
        }else {
            res.send({status: 'success', data: book})
        }
    });
});

/* REMOVE the book document that match a particular criteria */
router.delete('/deleteBook',(req, res, next)=>{

    const keyword= req.query.title;

    bookModel.remove({title:keyword},(err, book) => {
        if(err){
            res.send(err);
        }else {
            res.send({status: 'success', data: book})
        }
    })
});

/* DELETE all books in the database */
router.delete('/deleteAllBooks',(req, res, next)=>{
    bookModel.remove({},(err, book)=> {
        if (err) {
            res.send(err);
        }else {
            res.send({status: 'success', data: book});
        }
    });
});


module.exports = router;