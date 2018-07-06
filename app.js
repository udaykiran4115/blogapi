var express = require('express');
var app = express();
var bodyParser = require('body-paser')

var mangoose = require('mongoose');

mongoose.connect("");

app.use(bodyParser.urlencoding({extended:true}));
app.use(bodyParser.json());

//get the schema
var Blog = require('schema.js')

//get on root.
app.get('/', function(req, res){
    res.send('You have called the root..')
})

// Get request to get all the blogs.
app.get('/blogs', function(req, res){
    Blog.find(function(err,blogs){
        res.json(blogs)
    })
})

app.post('/blogs', function(req,res){
    console.log(req.body)
    
})

// Get request for blog instance.
app.get('/blogs/:id', function(req, res){
    Blog.find(function(err,blogs){
        res.json(blogs)
    })
})

//Update the blog instance 
app.put('/blogs/:id', function(req, res){
    Blog.findAndUpdate(req.param, function(err,blogs){
        res.json(blogs)
    })
})

//server listening to port number.
app.listen(3000, function(){
    console.log('Listening to the port 3000');
})


