const makePostUser = ({ addUser }) => async (request: any, h: any) => {
  try {
    const { username, email } = request.body;
    if (!username) {
      return h.response({
        error: 'missing username data',
      }).code(400);
    }

    if (!email) {
      return h.response({
        error: 'missing email data',
      }).code(400);
    }

    const user = await addUser({
      username,
      email,
    });
    return h.response(user).code(201);
  } catch (e) {
    const error = e as Error;
    return h.response({
      error: error.message,
    }).code(500);
  }
};

export default makePostUser;
