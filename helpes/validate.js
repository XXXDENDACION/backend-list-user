const Validator = require('validatorjs');
const User = require('../models/user');
const validator = (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};
Validator.registerAsync('exist', function(value,  attribute, req, passes) {
    if (!attribute) throw new Error('Specify Requirements i.e fieldName: exist:table,column');
    let attArr = attribute.split(",");
    if (attArr.length !== 2) throw new Error(`Invalid format for validation rule on ${attribute}`);
    const { 0: table, 1: column } = attArr;
    let msg = (column == "s") ? `${column} has already been taken `: `${column} already in use`
    console.log({[column]: value});
    if(value ==='Art Manager') {
        User.valueExists({ [column]: value })
        .then((result) => {
        if(result){
            console.log("result:",result);
            passes(false, msg); 
            return;
        }
        passes();
    })
    }
    else passes();
});
module.exports = validator;