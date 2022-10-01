const router = require('express').Router();
const employee = require('./employee');


router.use('/employee', employee);


module.exports = router;