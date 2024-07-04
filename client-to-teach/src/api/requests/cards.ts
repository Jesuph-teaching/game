import axiosConfig from '$client/axiosConfig';

export const getCards = async (): Promise<CardEssential<string>[]> =>
	axiosConfig
		.get('/cards')
		.then((res) => res.data as ResponseI<CardEssential<string>[]>)
		.then((res) => res.data)
		.catch((err) => {
			console.error(err);
			return [];
		});
