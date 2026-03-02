import  express from 'express'
import bodyParse from 'body-parser';
import routes from './routes/tobeproducts.js'
import DB from './config/db.js'

connectDb();
const app = express()
const port = 5000;

app.use('/users', routes);

app.use(bodyParse.json());

app.listen (port, ()=> console.log("the server is running"))


