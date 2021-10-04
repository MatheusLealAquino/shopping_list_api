import jwt from 'jsonwebtoken';

async function login(request: any, h: any) {
  const { username, password } = request.payload;

  return h.response({
    token: jwt.sign(
      {
        id: 1,
        username,
        password,
      },
      process.env.JWT_SECRET as string,
    ),
  }).code(200);
}

async function adminLogin(request: any, h: any) {
  const { username, password } = request.payload;

  return h.response({
    token: jwt.sign(
      {
        id: 1,
        username,
        password,
      },
      process.env.JWT_SECRET_ADMIN as string,
    ),
  }).code(200);
}

async function getAll(request: any, h: any) {
  return h.response([{
    name: 'Zezinho',
  }]).code(200);
}

async function getById(request: any, h: any) {
  const { id } = request.params;

  if (request.auth.credentials.id !== id) {
    h.response({
      message: 'Not authorized',
    }).code(403);
  }

  return h.response({
    name: 'Zezinho',
  }).code(200);
}

export default {
  login,
  adminLogin,
  getAll,
  getById,
};
