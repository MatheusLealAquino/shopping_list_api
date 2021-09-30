const jwt = require('jsonwebtoken');

async function getUsers(request, h) {
  return h.response([{
    name: 'Zezinho'
  }]).code(200);
}

async function getUserById(request, h) {
  const { id } = request.params;

  return h.response({
    message: `Ola ${id}`,
    token: jwt.sign({ id }, process.env.JWT_SECRET)
  }).code(200);
}

module.exports = {
  getUsers,
  getUserById,
}
