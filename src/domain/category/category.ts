import ICategory from './interface';

const buildCategory = () => ({
	_id,
	name,
	icon,
} : ICategory) => Object.freeze({
	getId: () => _id,
	getName: () => name,
	getIcon: () => icon,
});

export default buildCategory;
