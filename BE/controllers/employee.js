const httpStatus = require('http-status');
const db = require('../models');
const parse = el => JSON.parse(JSON.stringify(el));
const { Op } = require('sequelize');

const getEmployees = async (req, res, next) => {
	try {
		let limit = parseInt(req.query?.limit) || 10;
		let page = parseInt(req.query?.page) || 1;
		let attributes = [ 'employee_id', 'name', 'email', 'mobile_number' ];

		let query = {
			where: {

			},
			// attributes: [ 'id', ...attributes ],
			limit,
			offset: (page - 1) * limit,
			order: [ [ req.query.sortby || 'id', req.query.sort || 'desc' ] ],
		};

		if (req.query.search) {
			let searchQuery = {};
			[ ...attributes, 'gender', 'age', 'other_mobile_number' ].map(el => {
				searchQuery[ el ] = {
					[ Op.like ]: `%${req.query.search}%`
				}
			});
			query.where = {
				...query.where,
				[ Op.or ]: searchQuery
			};
		}

		let employees = await db.employee.findAndCountAll(query);
		req.locals.res = employees;
		req.locals.msg = 'Employee details fetched.';
		next();

	} catch (error) {
		next(error.message);
	}
};

const addEmployee = async (req, res, next) => {
	try {
		let data = await db.employee.create(req.body);
		req.locals.res = data;
		req.locals.msg = 'Employee addedd successfully.';

		next();
	} catch (error) {
		next(error.message);
	}
};

const updateEmployee = async (req, res, next) => {
	try {
		let where = {
			id: req.params.id
		};
		await db.employee.update(req.body, { where });

		let data = await db.employee.findOne({ where });

		req.locals.msg = 'Employee updated successfully.';
		req.locals.res = data;
		next();
	} catch (error) {
		next(error.message);
	}
};

const employeeByID = async (req, res, next) => {
	try {
		let data = await db.employee.findOne({
			where: {
				id: req.params.id
			}
		});

		req.locals.msg = 'Employee fetched successfully.';
		req.locals.res = data;
		next();
	} catch (error) {
		next(error.message);
	}
}

module.exports = {
	getEmployees,
	addEmployee,
	updateEmployee,
	employeeByID
};