const express = require('express');
const router = express.Router();
const Validator = require('validatorjs');
const roles = require('../ const/roles');
const { getUp, addUp } = require('../controllers/role-controller');


router.get('/', getUp);

router.post('/', addUp);

module.exports = router;