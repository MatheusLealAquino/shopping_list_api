import * as Hapi from '@hapi/hapi';
import * as hapiJwt from '@hapi/jwt';
import routes from './routes';

require('dotenv').config();

const start = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
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
        id: artifacts.decoded.payload.id,
        username: artifacts.decoded.payload.username,
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
        id: artifacts.decoded.payload.id,
        username: artifacts.decoded.payload.username,
      },
    }),
  });

  server.route(routes);

  server.start().then(() => {
    console.log('Server running on %s', server.info.uri);
  });
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

start();
