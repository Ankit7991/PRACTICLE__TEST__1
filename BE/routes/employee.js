const router = require('express').Router();
const { getEmployees, addEmployee, updateEmployee, employeeByID } = require('../controllers/employee');
const { joi, employee_joi } = require('../helper/joi');
const validator = require('express-validation');



router.route('/:id')
	.patch(validator.validate(employee_joi.update), updateEmployee)
	.get(validator.validate(employee_joi.get_all), employeeByID)

router.route('/')
	.get(validator.validate(employee_joi.get_all), getEmployees)
	.post(validator.validate(employee_joi.create), addEmployee)


module.exports = router;