const express = require('express');
const mongoose = require('mongoose');
const querystring = require('querystring');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
require('dotenv/config');

app.use(cors());
app.use(bodyParser.json());

const usersRoute = require('./routes/users');

app.use('/user', usersRoute);

app.get('/', async (req,res) => {
    const page = req.query.page;
    const limit = req.query.limit;
    
    console.log(page,limit);
    res.send(`We are on home page=${page},limit=${limit}`);
});

mongoose.connect(
    process.env.DB_CONNECTION,
    {useUnifiedTopology: true, useNewUrlParser: true},
    () => console.log("Connect to Users Database")
);

app.listen(3000);