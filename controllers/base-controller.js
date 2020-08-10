
const User = require("../models/user");

module.exports = {
    signup: (req, res) => {
        const { firstName, lastName, email, role} = req.body;
        const newUserObj = { firstName, lastName, email, role};
        const newUser = new User(newUserObj);
        newUser.save((saveErr) => {
            if(saveErr) {
                return res.status(412).send({
                    success: false,
                    message: saveErr
                })
            }
            return res.status(200).json({
                success: true,
                message: "signup successful"
            });
        });   
    }
}