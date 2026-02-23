const mogoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myapp', )
.then(() =>console.log("conneted"))
    .catch((err) => {console.error("connection error", err)});

app.get('/users', (req, res) => {
    res.JSON("server is active");
});