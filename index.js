const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;



mongoose.connect('mongodb://localhost:27017/local', )
.then(() =>console.log("conneted"))
    .catch((err) => {console.error("connection error", err)});

app.get('/users', (req, res) => {
    res.json({message: "server is active"});
});


// app.middleware((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// });

function logmid(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

app.use(logmid);

app.get('/users', (req, res) => {
  res.send('we are getting all users!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/users', (req, res) => {
  res.json({message: "server is active"});
}         
);