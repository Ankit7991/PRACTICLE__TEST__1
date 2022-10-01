'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Employees', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true
			},
			name: {
				type: Sequelize.STRING(128),
				required: true
			},
			email: {
				type: Sequelize.STRING,
				required: true
			},
			employee_id: {
				type: Sequelize.STRING(10),
				required: true
			},
			mobile_number: {
				type: Sequelize.STRING(20),
				required: true
			},
			gender: {
				type: Sequelize.ENUM('Male', 'Female', 'Other'),
				required: true
			},
			age: {
				type: Sequelize.INTEGER,
				required: true,
			},
			other_mobile_number: {
				type: Sequelize.STRING(20),
				allowNull: true
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Employees');
	}
};