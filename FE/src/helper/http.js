import axios from 'axios';
import toaster from 'react-hot-toast';

const baseUrl = 'http://localhost:3001/api';

/**
 * 
 * @param {string} method
 * @param {obj} opt
 * @param {obj} opt.queryString
 * @param  {...any} props 
 * - get/delete [url, config]
 * - post/patch [url, data, config]
 */
export default async function http(method, url, opt) {
	let res = null;
	try {
		// mange path
		let path = `${baseUrl}${url.startsWith('/') ? url : '/' + url}`;
		let queryStrings = Object.keys(opt?.queryString || {})
			.filter(el => opt.queryString[ el ])
			.map(el => `${el}=${opt.queryString[ el ]}`).join('&');
		if (queryStrings) path += `?${queryStrings}`;
		let data = await axios[ method ](...[ path, opt?.payload ].filter(el => el));
		res = data;
		if (!opt?.suppressPopup) toaster.success(res.data.message);
		return res.data;
	} catch (error) {
		toaster.error(error?.response?.data?.error?.message || res?.message || error.message);
	}
}