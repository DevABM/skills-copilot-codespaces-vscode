// create web server
// 1. import express
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
// 2. create web server
const app = express();
// 3. set port
const port = 3000;
// 4. set template engine
app.set('view engine', 'ejs');
// 5. set template folder
app.set('views', './views');
// 6. set static folder
app.use(express.static('public'));
// 7. set body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// 8. set router
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/comments', (req, res) => {
  // 1. get data from file
  const comments = JSON.parse(fs.readFileSync(path.join(__dirname, 'comments.json'), 'utf8'));
  // 2. render data to view
  res.render('comments', { comments });
});

app.post('/comments', (req, res) => {
  // 1. get data from request
  const { name, comment } = req.body;
  // 2. get data from file
  const comments = JSON.parse(fs.readFileSync(path.join(__dirname, 'comments.json'), 'utf8'));
  // 3. add new data to file
  comments.push({ name, comment });
  fs.writeFileSync(path.join(__dirname, 'comments.json'), JSON.stringify(comments));
  // 4. redirect to comments page
  res.redirect('/comments');
});

// 9. start server
app.listen(port, () => {
  console.log('Server is listening at port ' + port);
});
