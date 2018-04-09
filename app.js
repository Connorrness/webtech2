var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = ("mongodb://Setanta:1234@ds137019.mlab.com:37019/blogposts");

var app = express();

var mydb;

MongoClient.connect(url, function(err, db) {
  if (err){
    console.log('database connect error');
  }
  mydb = db.db('blogposts');
  mydb.createCollection('posts', function(err, res) {
    if (err){
      console.log('creation fail');
    }
  });
});

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/blogposts', (req, res) => {
  mydb.collection('posts').find().toArray(function(err, results){
    res.send(results);
    if (err){
      console.log('adding to database fail');
    }
  });
});

app.get('/blogposts/:id', (req, res) => {
  mydb.collection('posts').findOne({_id: mongodb.ObjectID( req.params.id)}, (err, result) => {
    res.send(result);
    if (err){
      console.log('find post fail');
    }
  });
});

app.post('/blogposts', (req, res) => {
  mydb.collection('posts').save(req.body, (err, result) => {
    if (err){
      console.log('save fail');
    }
  });
});

app.put('/blogposts/update/:id', function(req,res){
    const data = req.body;
    db.posts.update({_id: ObjectId(req.params.id)}, {$set: data},function(err, result){
        if(err){
          console.log('update fail');
        }
    });
});

app.delete('/blogposts/:id', (req, res) => {
  mydb.collection('posts').deleteOne({_id: mongodb.ObjectID( req.params.id)}, (err, result) => {
    if (err){
      console.log('delete fail');
    }
  });
});

app.listen(3000);
