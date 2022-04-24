const makeGetCategories = ({ getCategories }) => async (request: any, h: any) => {
	try {
		const categories = await getCategories();

		return h.response({
			total: categories.length,
			data: categories,
		}).code(200);
	} catch (e) {
		const error = e as Error;

		return h.response({
			error: error.message,
		}).code(500);
	}
};

export default makeGetCategories;
