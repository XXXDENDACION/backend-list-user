const express = require('express');
const querystring = require('querystring');
const router = express.Router();
const Validator = require('validatorjs');
const User = require('../models/user');
const baseController = require("../controllers/base-controller");
const validationMiddleware = require('../middleware/middlewar-validate');




router.get('/', baseController.getup);

router.post('/',
    validationMiddleware.signup,
    baseController.addup);

router.delete('/', baseController.deleteup);

router.patch('/',
    validationMiddleware.signup,
    baseController.patchup);


module.exports = router;