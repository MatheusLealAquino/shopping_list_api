import ICategory from './interface';

const buildCategory = () => ({
	_id,
	name,
	icon,
} : ICategory) => {
	if (!name) throw new Error('Necessary to receive name');

	return Object.freeze({
		getId: () => _id,
		getName: () => name,
		getIcon: () => icon,
	});
};

export default buildCategory;
