import mongoConnectionAdapter from '../../../infrastructure/db/mongoConnectionAdapter';

import makeCategoryMongo from '../../../interfaces/data-access/category-mongo';

import makeAddCategory from './add-category';

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

test('when dont receive icon then insert default icon', async () => {
	const addCategory = makeAddCategory({
		categoryRepository,
	});

	const output = await addCategory({
		name: 'Padaria',
	});

	expect(output.name).toBe('Padaria');
	expect(output.icon).toBe('defaultimage.png');
});

test('when already exists then throw error with category already exists', async () => {
	const addCategory = makeAddCategory({
		categoryRepository,
	});

	const output = await addCategory({
		name: 'Padaria',
		icon: 'padaria.png',
	});

	expect(output.name).toBe('Padaria');
	expect(output.icon).toBe('padaria.png');

	try {
		await addCategory({
			name: 'Padaria',
		});
	} catch (err) {
		const error = err as Error;
		expect(error.message).toBe('Category already exists');
	}
});
