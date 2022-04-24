import mongoConnectionAdapter from '../../../infrastructure/db/mongoConnectionAdapter';

import makeCategoryMongo from '../../../interfaces/data-access/category-mongo';
import makeAddCategory from '../add-category/add-category';

import makeGetCategories from './get-categories';

let categoryRepository;
beforeAll(async () => {
	const connection = await mongoConnectionAdapter.makeDb();
	categoryRepository = makeCategoryMongo({
		db: connection,
	});
});

beforeEach(async () => {
	await categoryRepository.clearCollection();
});

afterAll(async () => {
	await mongoConnectionAdapter.closeDb();
});

test('when find categories then return array with then', async () => {
	const addCategory = makeAddCategory({
		categoryRepository,
	});

	const getCategories = makeGetCategories({
		categoryRepository,
	});

	await addCategory({
		name: 'Padaria',
	});

	const output = await getCategories();

	expect(output.length).toBeGreaterThan(0);
	expect(output[0].name).toBe('Padaria');
});

test('when dont find categories return empty array', async () => {
	const getCategories = makeGetCategories({
		categoryRepository,
	});

	const output = await getCategories();

	expect(output.length).toBe(0);
});
