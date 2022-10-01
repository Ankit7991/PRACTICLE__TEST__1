import { createSlice } from '@reduxjs/toolkit';


const manageEmployeeSlice = createSlice({
	name: 'employee',
	initialState: {
		"name": '',
		"email": '',
		"employee_id": '',
		"mobile_number": '',
		"gender": '',
		"age": '',
		"other_mobile_number": '',
	},
	reducers: {
		addUser(state, action) {
			let data = action.payload.data;
			Object.keys(data).map(el => {
				state[ el ] = data[ el ];
			});
		}
	}
});

export const manageEmployeeActions = manageEmployeeSlice.actions;

export default manageEmployeeSlice;