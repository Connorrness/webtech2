var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = ("mongodb://Setanta:1234@ds137019.mlab.com:37019/blogposts");

var app = express();

var mydb;

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, "/views"));

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  mydb = db.db('blogposts');
  mydb.createCollection('posts', function(err, res) {
    if (err) throw err;
  });
});

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/blogposts', (req, res) => {
  mydb.collection('posts').find().toArray(function(err, results){
    res.send(results);
  });
});

app.get('/blogposts/:id', (req, res) => {
  mydb.collection('posts').findOne({_id: mongodb.ObjectID( req.params.id)}, (err, result) => {
    res.send(result);
  });
});

app.post('/blogposts', (req, res) => {
  mydb.collection('posts').save(req.body, (err, result) => {
    if (err) throw err;
  });
});

app.put('/blogposts/update/:id', function(req,res){
    const data = req.body;
    db.posts.update({_id: ObjectId(req.params.id)}, {$set: data},function(err, result){
        if(err) throw err;
    });
});

app.delete('/blogposts/:id', (req, res) => {
  mydb.collection('posts').deleteOne({_id: mongodb.ObjectID( req.params.id)}, (err, result) => {
    if (err) throw err;
  });
});

app.listen(3000);
