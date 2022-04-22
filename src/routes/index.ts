import userRoutes from '../infrastructure/user/webserver/routes';

export default (connection) => ([
	...userRoutes(connection),
]);
