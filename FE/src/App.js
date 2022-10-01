import React from 'react';
import {
	BrowserRouter,
	// Switch,
	Routes,
	Route,
	Navigate
} from 'react-router-dom';
import './style.scss';
import { Toaster } from 'react-hot-toast';
import EmployeeList from './component/employeeLIst';
import AddEmployee from './component/addEmployee';



export default function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Navigate to='/employee/list' />} />
					<Route path='/employee/list' element={<EmployeeList />} />
					<Route path='/employee/add' element={<AddEmployee type='' />} />
					<Route path='/employee/update/:id' element={<AddEmployee type='update' />} />
				</Routes>
			</BrowserRouter>
			<Toaster
				position="top-center"
				reverseOrder={false}
			/>
		</>
	);
}
