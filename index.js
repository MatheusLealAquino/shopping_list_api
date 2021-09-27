const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const start = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });

  await server.register(require('@hapi/jwt'));

  server.auth.strategy('userAuth', 'jwt', {
    keys: 'some_shared_secret',
    verify: {
      aud: false,
      iss: false,
      sub: false,
      nbf: true,
      exp: true,
      maxAgeSec: 14400, // 4 hours
      timeSkewSec: 15
    },
    validate: async (artifacts, request, h) => {
      return {
        isValid: true,
        credentials: { user: artifacts.decoded.payload.user }
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