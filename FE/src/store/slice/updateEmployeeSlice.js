import { createSlice } from '@reduxjs/toolkit';


const updateEmployeeSlice = createSlice({
	name: 'employee',
	initialState: {
		"name": null,
		"email": null,
		"employee_id": null,
		"mobile_number": null,
		"gender": null,
		"age": null,
		"other_mobile_number": null,
	},
	reducers: {
		addUser(state, action) {
		}
	}
});

export const updateEmployeeActions = updateEmployeeSlice.actions;

export default updateEmployeeSlice;