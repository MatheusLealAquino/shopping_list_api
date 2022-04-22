import * as Hapi from '@hapi/hapi';
import * as hapiJwt from '@hapi/jwt';

import mongoConnectionAdapter from './infrastructure/db/mongoConnectionAdapter';

import routes from './routes';

const start = async () => {
	const server = Hapi.server({
		port: 3000,
		routes: {
			cors: true,
		},
	});

	await server.register(hapiJwt);

	server.auth.strategy('userAuth', 'jwt', {
		keys: process.env.JWT_SECRET,
		verify: {
			aud: false,
			iss: false,
			sub: false,
			nbf: true,
			exp: true,
			maxAgeSec: 0,
			timeSkewSec: 15,
		},
		// eslint-disable-next-line no-unused-vars
		validate: async (artifacts: any, request: any, h: any) => ({
			isValid: true,
			credentials: {
				_id: artifacts.decoded.payload._id,
				email: artifacts.decoded.payload.email,
			},
		}),
	});

	server.auth.strategy('adminAuth', 'jwt', {
		keys: process.env.JWT_SECRET_ADMIN,
		verify: {
			aud: false,
			iss: false,
			sub: false,
			nbf: true,
			exp: true,
			maxAgeSec: 0,
			timeSkewSec: 15,
		},
		// eslint-disable-next-line no-unused-vars
		validate: async (artifacts: any, request: any, h: any) => ({
			isValid: true,
			credentials: {
				_id: artifacts.decoded.payload._id,
				email: artifacts.decoded.payload.email,
			},
		}),
	});

	const connection = await mongoConnectionAdapter.makeDb();
	server.route(routes(connection));

	server.start().then(() => {
		console.log('Server running on %s', server.info.uri);
	});
};

process.on('unhandledRejection', (err) => {
	console.error(err);
	process.exit(1);
});

start();
