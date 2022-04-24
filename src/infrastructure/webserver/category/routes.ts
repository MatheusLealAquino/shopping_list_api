import categoryController from '../../../interfaces/controllers/category';

export default (connection) => {
	const categoryControllerWithConnection = categoryController(connection);

	return [
		{
			method: 'POST',
			path: '/category',
			handler: categoryControllerWithConnection.postCategory,
			config: { auth: 'adminAuth' },
		},
		{
			method: 'GET',
			path: '/category',
			handler: categoryControllerWithConnection.getAllCategories,
		},
	];
};
