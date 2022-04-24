import dataAccess from '../../data-access';

import addCategory from '../../../application/usecase/add-category/add-category';
import getCategories from '../../../application/usecase/get-categories/get-categories';

import makePostCategory from './post-category';
import makeGetCategories from './get-categories';

const postCategory = (categoryRepository) => (makePostCategory({
	addCategory: addCategory({
		categoryRepository,
	}),
}));

const getAllCategories = (categoryRepository) => (makeGetCategories({
	getCategories: getCategories({
		categoryRepository,
	}),
}));

const categoryController = (repositoryFactory) => {
	const categoryRepository = dataAccess.categoryMongo(repositoryFactory);

	const postCategoryMounted = postCategory(categoryRepository);
	const getAllCategoriesMounted = getAllCategories(categoryRepository);

	return Object.freeze({
		postCategory: postCategoryMounted,
		getAllCategories: getAllCategoriesMounted,
	});
};

export default categoryController;
