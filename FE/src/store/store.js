import { configureStore } from '@reduxjs/toolkit';
import employeeSlice from './slice/employeeSlice';
import manageEmployeeSlice from './slice/managEmployeeSlice';

const store = configureStore({
	reducer: {
		employees: employeeSlice.reducer,
		employee: manageEmployeeSlice.reducer
	}
});


export default store;