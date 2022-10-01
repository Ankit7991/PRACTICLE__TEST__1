import { createSlice } from '@reduxjs/toolkit';


const employeeSlice = createSlice({
	name: 'employee',
	initialState: {
		employees: [],
		page: 1,
		limit: 10,
		search: '',
		sort: '',
		sortby: ''
	},
	reducers: {
		getEmployees(state, action) {
			let data = action.payload.data.data;
			state.employees = data.rows;
			state.totalCount = data.count;
			state.pageArr = Array(Math.ceil(data.count / state.limit)).fill('').map((el, i) => i + 1);
		},
		pageChange(state, action) {
			state.page = action.payload.page;
		},
		sort(state, action) {
			state.sort = action.payload.sort;
			state.sortby = action.payload.sortby;
		},
		search(state, action) {
			state.search = action.payload;
			state.page = 1;
		},
		flushFilter(state, action) {
			this.page = 1;
			this.limit = 10;
			this.search = '';
			this.sort = '';
			this.sortby = '';
		}
	}
});

export const employeeActions = employeeSlice.actions;

export default employeeSlice;