import IUser from './interface';

function isValidEmail(email : string) {
	return email.includes('@');
}

const buildMakeUser = () => ({
	_id,
	email,
	password,
	name,
	isActive = true,
	isAdmin = false,
} : IUser) => {
	if (email && !isValidEmail(email)) {
		throw new Error('necessary to receive valid email');
	}

	return Object.freeze({
		getId: () => _id,
		getName: () => name,
		getEmail: () => email,
		getPassword: () => password,
		getIsActive: () => isActive,
		getIsAdmin: () => isAdmin,
	});
};

export default buildMakeUser;
