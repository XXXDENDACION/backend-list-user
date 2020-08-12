const Role = require('../models/roles');


module.exports = {
    getUp: async (req, res) => {
        try {
            let query;
            const paramId = req.query.id;
            if (paramId) {
                query = { viewValue: paramId }
            } else query = {}
            const roles = await Role.find(query);
            res.json(roles);
        } catch (err) {
            res.json({ message: err })
        }
    },

    addUp: async (req, res) => {
        try {
            const newRole = new Role(req.body.viewValue);
            await newRole.save((saveErr) => {
                if (saveErr) {
                    res.json({ message: saveErr })
                }
                res.json(newRole);
            })
        } catch (err) {
            res.json({ message: err })
        }
    }

}