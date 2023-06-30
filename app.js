const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./config/db');
const userModel = require('./model/user.model');
const userRouter = require('./router/user.router');

app.use(bodyParser.json());
app.use('/', userRouter);

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
});