import userRoutes from '../infrastructure/webserver/user/routes';
import categoryRoutes from '../infrastructure/webserver/category/routes';

export default (connection) => ([
	...userRoutes(connection),
	...categoryRoutes(connection),
]);
