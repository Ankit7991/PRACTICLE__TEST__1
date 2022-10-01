import React, { useEffect, useState } from 'react';
import http from '../helper/http';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { manageEmployeeActions } from '../store/slice/managEmployeeSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { employeeActions } from '../store/slice/employeeSlice';


export default function AddEmployee(props) {
	const [ userDetails, setUserDetails ] = useState({});

	let { id: idToUpdate } = useParams();
	const navigate = useNavigate();
	const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
	const state = useSelector(state => state.employee);
	const [ employee, setEmployee ] = useState(state);
	function manageEmp(e, field) {

	}
	const dispatch = useDispatch();

	async function managesubmit(formdata) {
		let addUser = await http(...idToUpdate ? [ 'patch', `employee/${idToUpdate}` ] : [ 'post', 'employee' ], {
			payload: formdata
		});
		if (addUser) {
			navigate('/employee/list');
			dispatch(employeeActions.flushFilter());
		}
	}

	useEffect(() => {
		if (idToUpdate) {
			(async function () {
				await getUserByID();
			})();
		}
	}, []);


	async function getUserByID() {
		let data = await http('get', `/employee/${idToUpdate}`);
		// dispatch(manageEmployeeActions.addUser({ data: data.data }));
		setUserDetails(prevdata => { return { ...prevdata, ...data.data }; });
		delete data.data.id;
		delete data.data.createdAt;
		delete data.data.updatedAt;
		reset({ ...data.data });
		return data;
	}

	return (
		<div id='add-employee-form'>
			<form onSubmit={handleSubmit(managesubmit)}>
				<input type='text' defaultValue={userDetails.name} placeholder="Name" {...register('name', {
					required: 'Name is required.',
				})} />
				<span>{errors.name?.message}</span>
				<input type='email' defaultValue={userDetails.email} placeholder="Email" {...register('email', {
					required: 'Email must be valid.'
				})} />
				<span>{errors.email?.message}</span>
				<input type='text' defaultValue={userDetails.employee_id} placeholder="Employee ID" {...register('employee_id', {
					required: 'Employee ID is required.'
				})} />
				<span>{errors.employee_id?.message}</span>
				<input type='number' defaultValue={userDetails.mobile_number} placeholder="Mobile Number" {...register('mobile_number', {
					required: "Mobile number is required."
				})} />
				<span>{errors.mobile_number?.message}</span>
				<input type='text' defaultValue={userDetails.gender} placeholder="Gender" {...register('gender', {
					required: "Gender is required."
				})} />
				<span>{errors.gender?.message}</span>
				<input type='number' defaultValue={userDetails.age} placeholder="Age" {...register('age', {
					required: 'Age should be between 18 and 60',
					min: 18, max: 60
				})} />
				<span>{errors.age?.message}</span>
				<input type='number' defaultValue={userDetails.other_mobile_number} placeholder="Other Mobile number" {...register('other_mobile_number', {
				})} />
				<span>{errors.other_mobile_number?.message}</span>

				<button>{!idToUpdate ? 'Add' : 'Update'} Employee</button>
			</form>
		</div>
	);
}
