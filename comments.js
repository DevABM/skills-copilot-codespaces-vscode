// create web server

const express = require("express");
const app = express();
const PORT = 3000;
const { comments } = require("./data");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// GET request
app.get("/api/comments", (req, res) => {
  res.status(200).json(comments);
});

// POST request
app.post("/api/comments", (req, res) => {
  const { body } = req;
  if (body.name && body.comment) {
    const newComment = {
      id: comments.length + 1,
      name: body.name,
      comment: body.comment,
    };
    comments.push(newComment);
    res.status(201).json(newComment);
  } else {
    res.status(400).json({ msg: "Please enter name and comment" });
  }
});

// PUT request
app.put("/api/comments/:id", (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const comment = comments.find((comment) => comment.id === Number(id));
  if (comment) {
    const index = comments.indexOf(comment);
    comments[index] = { ...comment, ...body };
    res.status(200).json(comments[index]);
  } else {
    res.status(404).json({ msg: `Comment not found with id of ${id}` });
  }
});

// DELETE request
app.delete("/api/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((comment) => comment.id === Number(id));
  if (comment) {
    comments = comments.filter((comment) => comment.id !== Number(id));
    res.status(200).json({ msg: `Comment deleted with id of ${id}` });
  } else {
    res.status(404).json({ msg: `Comment not found with id of ${id}` });
  }
});

// listen on port 3000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


