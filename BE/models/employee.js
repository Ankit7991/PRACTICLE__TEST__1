'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Employee extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Employee.init({
		id: {
			type: DataTypes.NUMBER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING(128),
			required: true
		},
		email: {
			type: DataTypes.STRING,
			required: true
		},
		employee_id: {
			type: DataTypes.STRING(10),
			required: true
		},
		mobile_number: {
			type: DataTypes.STRING(20),
			required: true
		},
		gender: {
			type: DataTypes.ENUM('Male', 'Female', 'Other'),
			required: true
		},
		age: {
			type: DataTypes.NUMBER,
			required: true,
		},
		other_mobile_number: {
			type: DataTypes.STRING(20),
			allowNull: true
		}
	}, {
		sequelize,
		modelName: 'employee',
	});
	return Employee;
};