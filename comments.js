// create web server

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// setup database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/express-demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// create schema
const commentSchema = new mongoose.Schema({
  name: String,
  content: String,
});

// create model
const Comment = mongoose.model('Comment', commentSchema);

// create a new comment
// const newComment = new Comment({
//   name: 'AAA',
//   content: 'AAA',
// });

// newComment.save((err, comment) => {
//   if (err) return console.error(err);
//   console.log(comment);
// });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/comments', (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) return console.error(err);
    res.send(comments);
  });
});

app.get('/comments/:id', (req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (err) return console.error(err);
    res.send(comment);
  });
});

app.post('/comments', (req, res) => {
  const newComment = new Comment(req.body);
  newComment.save((err, comment) => {
    if (err) return console.error(err);
    res.send(comment);
  });
});

app.patch('/comments/:id', (req, res) => {
  Comment.findByIdAndUpdate(req.params.id, req.body, (err, comment) => {
    if (err) return console.error(err);
    res.send(comment);
  });
});

app.delete('/comments/:id', (req, res) => {
  Comment.findByIdAndDelete(req.params.id, (err, comment) => {
    if (err) return console.error(err);
    res.send(comment);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
