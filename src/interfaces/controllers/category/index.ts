import dataAccess from '../../data-access';

import addCategory from '../../../application/usecase/add-category/add-category';

import makePostCategory from './post-category';

const postCategory = (categoryRepository) => (makePostCategory({
	addCategory: addCategory({
		categoryRepository,
	}),
}));

const categoryController = (repositoryFactory) => {
	const categoryRepository = dataAccess.categoryMongo(repositoryFactory);

	const postCategoryMounted = postCategory(categoryRepository);

	return Object.freeze({
		postCategory: postCategoryMounted,
	});
};

export default categoryController;
