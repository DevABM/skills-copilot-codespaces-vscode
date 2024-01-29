// create a web server

// 1. require the express module
const express = require('express');
const router = express.Router();
// 2. create an instance of an express server
const server = express();
// 3. require the json data
const comments = require('../data/comments');

// 4. create a route
router.get('/comments', (req, res) => {
    res.json(comments);
});

// 5. export the router
module.exports = router;