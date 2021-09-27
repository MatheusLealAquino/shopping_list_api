async function getUsers() {
  return h.response([{
    name: 'Zezinho'
  }]).code(200);
}

async function getUserById(request, h) {
  const { id } = request.params;

  return h.response(`Ola ${id}`).code(200);
}

module.exports = {
  getUsers,
  getUserById,
}
