import ICategory from '../../../domain/category/interface';

import makeCategory from '../../../domain/category';

const makeAddCategory = ({
	categoryRepository,
}) => async (categoryInfo: Omit<ICategory, '_id'>) => {
	if (!categoryInfo.icon) {
		categoryInfo.icon = 'defaultimage.png';
	}

	const category = makeCategory(categoryInfo);

	const foundCategory = await categoryRepository.getByName({
		name: category.getName(),
	});
	if (foundCategory) throw new Error('Category already exists');

	return categoryRepository.insert({
		name: category.getName(),
		icon: category.getIcon(),
	});
};

export default makeAddCategory;
