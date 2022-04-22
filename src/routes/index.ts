import userRoutes from '../infrastructure/webserver/user/routes';

export default (connection) => ([
	...userRoutes(connection),
]);
