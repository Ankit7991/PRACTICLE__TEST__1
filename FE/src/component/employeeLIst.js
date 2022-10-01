import React, { useEffect, useState } from 'react';
import http from '../helper/http';
import { useSelector, useDispatch } from 'react-redux';
import { employeeActions } from '../store/slice/employeeSlice';
import Datatable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';

export default function EmployeeList() {
	const navigate = useNavigate();
	const state = useSelector(state => state.employees);
	const dispatch = useDispatch();
	useEffect(() => {
		(async function () {
			let data = await getUser();
			// dispatch(employeeActions.getEmployees({ data }));
		})();
	}, [ state.page ]);

	useEffect(() => {
		(async function () {
			if (state.sort && state.sortby) await getUser({
				queryString: {
					sort: state.sort,
					sortby: state.sortby,
				}
			});
		})();
	}, [ state.sort, state.sortby ]);

	useEffect(() => {
		(async function () {
			await getUser({
				queryString: {
					search: state.search,
				},
				suppressPopup: true
			});
		})();
	}, [ state.search ]);


	async function getUser(opt = {}) {
		opt.queryString = {
			...opt.queryString,
			limit: state.limit,
			page: state.page
		};
		let data = await http('get', '/employee', opt);
		dispatch(employeeActions.getEmployees({ data }));
		return data;
	}

	const columns = [
		{
			name: 'ID',
			key: 'id',
			sortable: true,
			selector: row => row.id || '-'
		}, {
			name: 'Name',
			sortable: true,
			key: 'name',
			selector: row => row.name || '-'
		}, {
			name: 'Email',
			key: 'email',
			sortable: true,
			selector: row => row.email || '-'
		}, {
			name: 'Employee ID',
			key: 'employee_id',
			sortable: true,
			selector: row => row.employee_id || '-'
		}, {
			name: 'Mobile Number',
			key: 'mobile_number',
			sortable: true,
			selector: row => row.mobile_number || '-'
		}, {
			name: 'Gender',
			key: 'gender',
			sortable: true,
			selector: row => row.gender || '-'
		}, {
			name: 'Age',
			key: 'age',
			sortable: true,
			selector: row => row.age || '-'
		}, {
			name: 'Other Contact',
			key: 'other_mobile_number',
			sortable: true,
			selector: row => row.other_mobile_number || '-'
		}, {
			name: 'Action',
			cell: row => {
				return (
					<button onClick={() => {
						navigate(`/employee/update/${row.id}`)
					}}>Edit</button>
				);
			}
		}
	];


	return (
		<>
			<Datatable
				columns={columns}
				data={state.employees}
				pagination
				paginationServer
				paginationTotalRows={state.totalCount}
				onChangePage={(page, limit) => {
					dispatch(employeeActions.pageChange({ page }));
				}}
				fixedHeader
				// fixedHeaderScrollHeight={`${window.innerHeight - 100}px`}
				fixedHeaderScrollHeight='300px'
				onSort={(data, order) => {
					dispatch(employeeActions.sort({ sort: order, sortby: data.key }));
				}}
				subHeader
				subHeaderComponent={
					<div>
						<input type="text" onChange={e => {
							dispatch(employeeActions.search(e.target.value));
						}} value={state.search}></input>
						<span id='filters'>
							<button onClick={() => navigate('/employee/add')}>Add User +</button>
						</span>
					</div>
				}
			/>
		</>
	);
}
