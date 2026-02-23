const express = require('express');
const app = express();
const port = 3000;

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