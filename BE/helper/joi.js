const joi = require('joi');

const createObj = {
	name: joi.string().min(2).max(128).message('Name should be betweene 2 and 128 letters.'),
	email: joi.string().email().message('Invalid email.'),
	mobile_number: joi.string().max(20).message('Mobile number invalid.'),
	gender: joi.string().allow('Male', 'Female', 'Other'),
	other_mobile_number: joi.string().allow(''),
	employee_id: joi.string().max(10).message('Employee id should not exceed length of 10.'),
	gender: joi.string().valid('Male', 'Female', 'Other'),
	age: joi.number().min(18).max(60).message('Age should be between 18 to 60.'),
};
const employee_joi = {
	get_all: {
		// label: joi.string().required().error(() => { return { message: 'Please enter proper details' }; }),
		// completed: joi.boolean().allow(true, false, 0, 1),
		// deleted: joi.boolean().allow(true, false, 0, 1),
		query: joi.object({
			limit: joi.string(),
			page: joi.string(),
			search: joi.string(),
			sort: joi.string(),
			sortby: joi.string(),
		})
	},
	create: {
		body: joi.object({
			...createObj
		})
	},
	update: {
		body: joi.object({
			...createObj
		}),
		params: joi.object({
			id: joi.number()
		})
	}
};


module.exports = {
	employee_joi
};