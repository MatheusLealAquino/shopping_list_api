const makeGetCategories = ({
	categoryRepository,
}) => async () => categoryRepository.getCategories();

export default makeGetCategories;
