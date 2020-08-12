const User = require('../models/user');
const { remove } = require('../models/user');

module.exports = {
  index: (req, res) => {
    return res.status(200).json({
      success: true,
      message: ":)",
    })
  },

  addup: (req, res) => {

    const { firstName, lastName, email, role } = req.body;
    const newUserObj = { firstName, lastName, email, role };
    const newUser = new User(newUserObj);
    newUser.save((saveErr) => {
      if (saveErr) {
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


  },

  deleteup: async (req, res) => {
    try {
      const paramId = req.query.id;
      const removedUser = await User.deleteOne({ _id: paramId });
      return res.status(200).json({
        success: true,
        message: removedUser
      })
    } catch (err) {
      return res.status(412).send({
        success: false,
        message: err
      })
    }
  },

  patchup: async (req, res) => {
    try {
      const paramId = req.query.id;
      const updateUser = await User.updateOne(
        { _id: paramId },
        {
          $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            role: req.body.role
          }
        }
      );
      return res.status(200).json({
        success: true,
        message: updateUser
      })
    } catch (err) {
      return res.status(412).send({
        success: false,
        message: err
      })
    }
  },

  getup: async (req, res) => {
    try {
      let query;
      const queryRole = req.query.role;
      let querySearch = req.query.search;
      if (querySearch === undefined) querySearch = "";

      if (queryRole && queryRole !== "All") {
        query = {
          $and: [
            {
              $or: [{
                firstName:
                  { $regex: `(?i).*${querySearch}.*` }
              },
              { lastName: { $regex: `(?i).*${querySearch}.*` } },
              { email: { $regex: `(?i).*${querySearch}.*` } }]
            },
            { role: `${queryRole}` }
          ]
        };
      } else if (queryRole === "All") {
        query = {
          $or: [
            { firstName: { $regex: `(?i).*${querySearch}.*` } },
            { lastName: { $regex: `(?i).*${querySearch}.*` } },
            { email: { $regex: `(?i).*${querySearch}.*` } }]
        }
      }
      const user = await User.find(query)
      return res.status(200).json(user)

    } catch (err) {
      return res.status(200).json({
        success: false,
        message: err
      })
    }
  }

}