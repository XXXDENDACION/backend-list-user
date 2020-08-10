const express = require('express');
const querystring = require('querystring');
const router = express.Router();
const Validator = require('validatorjs');
const User = require('../models/user');
const baseController = require("../controllers/base-controller");
const validationMiddleware = require('../middleware/middlewar-validate');




router.get('/', async(req,res) => {
    try{
        let user;
        const paramId = req.query.id;
        console.log(paramId);
        if(paramId) {
            user = await User.findById(paramId);
        }
        else user = await User.find();
        res.json(user);
    }catch(err) {
        res.json({message:err})
    }
});

router.post('/',validationMiddleware.signup, baseController.signup ,async(req,res)=>{
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
});

router.delete('/', async(req,res) => {
    try {
        const paramId = req.query.id;
        const removedUser = await User.deleteOne({_id: paramId});
        res.json(removedUser);
    }catch(err) {
        res.json({message: err});
    }
});

router.patch('/', async(req,res) => {
    try {
        const paramId = req.query.id;
        const updateUser = await User.updateOne(
            {_id: paramId},
            {$set: {firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    role: req.body.role}}
        );
        res.json(updateUser);
    }catch(err) {
        res.json({message: err});
    }
})


module.exports = router;