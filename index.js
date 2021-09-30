const Hapi = require('@hapi/hapi');
const routes = require('./routes');
require('dotenv').config();

const start = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });

  await server.register(require('@hapi/jwt'));

  server.auth.strategy('userAuth', 'jwt', {
    keys: process.env.JWT_SECRET,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      nbf: true,
      exp: true,
      maxAgeSec: 0,
      timeSkewSec: 15
    },
    validate: async (artifacts, request, h) => {
      return {
        isValid: true,
        credentials: { 
          id: artifacts.decoded.payload.id,
          username: artifacts.decoded.payload.username,
        }
      };
    }
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
      timeSkewSec: 15
    },
    validate: async (artifacts, request, h) => {
      return {
        isValid: true,
        credentials: { 
          id: artifacts.decoded.payload.id,
          username: artifacts.decoded.payload.username,
        }
      };
    }
  });

  server.route(routes);

  server.start().then(() => {
    console.log('Server running on %s', server.info.uri);
  });
}

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

start();
