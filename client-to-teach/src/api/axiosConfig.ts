import { WEB_URL } from '&client/web';
import axios from 'axios';

const axiosConfig = axios.create({
	baseURL: WEB_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});

export default axiosConfig;
