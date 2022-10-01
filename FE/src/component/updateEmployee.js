import React, { useEffect, useState } from 'react';
import http from '../helper/http';
import { useSelector, useDispatch } from 'react-redux';


export default function AddEmployee() {
	const state = useSelector(state => state.employee);
	const [ employee, setEmployee ] = useState(state);
	function manageEmp(e, field) {

	}
	const dispatch = useDispatch();
	return (
		<div id='add-employee-form'>
			<div>
				<input type='text'
					onClick={e => manageEmp(e, 'name')}
					placeholder="Name" />
				<input type='email'
					onClick={e => manageEmp(e, 'email')}
					placeholder="Email" required />
				<input type='text'
					onClick={e => manageEmp(e, 'employee_id')}
					placeholder="Employee ID" />
				<input type='number'
					onClick={e => manageEmp(e, 'mobile_number')}
					placeholder="Mobile Number" />
				<input type='text'
					onClick={e => manageEmp(e, 'gender')}
					placeholder="Gender" />
				<input type='number'
					onClick={e => manageEmp(e, 'age')}
					placeholder="Age" />
				<input type='number'
					onClick={e => manageEmp(e, 'other_mobile_number')}
					placeholder="Other Mobile number" />

				<button>Add Employee</button>
			</div>
		</div>
	);
}
