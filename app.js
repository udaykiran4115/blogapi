var express = require('express');
var app = express();
var bodyParser = require('body-parser')

var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/blog");
mongoose.connection.on('open', function(err){
    if(err)
        console.log('Something went wrong while connecting to Database.:(') //On failure
    
    //on Success
    console.log('DataBase connection is Open...')
})

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//get the schema
var Blog = require('./schema.js')

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
    newBlog = new Blog({
        name : req.body.name,
        author : req.body.author,
        comments : req.body.comments,
        likes : req.body.likes
        
    })
    
    let date = new Date()
    newBlog.createdOn = date;
    newBlog.updatedOn = date;
    
    newBlog.save(function(err){
        if(err)
            res.status(400).send(err);
        else
            res.send(newBlog)
        
    })
    
})

// Get request for blog instance.
app.get('/blogs/:id', function(req, res){
    Blog.findById(req.params.id,function(err,blogs){
        if(err)
            res.send(err)
        if(blogs == null){
            console.log("################ BLog is emply")
            res.status(404).send('Sorry, we cannot find that!');
        } else{
            res.send(blogs)
        }
        
    })
})

//Update the blog instance 
app.put('/blogs/:id', function(req, res){
    var updateData = req.body
    Blog.findOneAndUpdate({'_id': req.params.id}, updateData, function(err,result){
        if(err)
            res.send(err)
        else
            res.send(result)
    })
})

app.delete('/blogs/:id', function(req, res){
    console.log("################### in Delete")
    Blog.remove({'_id': req.params.id}, function(err,result){
        if(err)
            res.send(err)
        else
            res.send({"Success": "Deleted."})
    })
     
})

//server listening to port number.
app.listen(3000, function(){
    console.log('Listening to the port 3000');
})


