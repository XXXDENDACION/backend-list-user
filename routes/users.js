const express = require('express');
const querystring = require('querystring');
const router = express.Router();
const User = require('../models/user');


router.get('/', async(req,res) => {
    try{
        const users = await User.find();
        res.json(users);
    }catch(err) {
        res.json({message:err})
    }
});


router.post('/', async(req,res)=>{
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        role: req.body.role
    });
    try{
    const savedUser = await user.save();
    res.json(savedUser);
    }catch(err) {
        res.json({message:err});
    }
})


module.exports = router;