const jwt = require('jsonwebtoken');

async function login(request, h) {
  const { username, password } = request.payload;

  return h.response({
    token: jwt.sign({ id: 1, username, password }, process.env.JWT_SECRET)
  }).code(200);
}

async function adminLogin(request, h) {
  const { username, password } = request.payload;

  return h.response({
    token: jwt.sign({ id: 1, username, password }, process.env.JWT_SECRET_ADMIN)
  }).code(200);
}

async function getAll(request, h) {
  return h.response([{
    name: 'Zezinho'
  }]).code(200);
}

async function getById(request, h) {
  const { id } = request.params;

  if (request.auth.credentials.id != id) {
    h.response({
      message: 'Not authorized'
    }).code(403);
  }

  return h.response({
    name: 'Zezinho'
  }).code(200);
}

module.exports = {
  login,
  adminLogin,
  getAll,
  getById,
}
