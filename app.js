const express = require('express');
const mongoose = require('mongoose');
const querystring = require('querystring');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
require('dotenv/config');

app.use(cors());
app.use(bodyParser.json());

const usersRoute = require('./routes/users');
const rolesRoute = require('./routes/roles');

app.use('/users', usersRoute);
app.use('/roles', rolesRoute);


app.use(morgan('dev'));

app.get('/', async (req,res) => {
    res.send(`We are on home page`);
});

mongoose.connect(
    process.env.DB_CONNECTION,
    {useUnifiedTopology: true, useNewUrlParser: true},
    () => console.log("Connect to Users Database")
);

app.listen(3000);