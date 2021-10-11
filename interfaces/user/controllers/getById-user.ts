const makeGetUserById = ({ getUserById }) => async (request: any, h: any) => {
  try {
    const { _id } = request.params;
    if (!_id) {
      return h.response({
        error: 'missing user id',
      }).code(400);
    }

    const user = await getUserById({
      _id,
    });

    return h.response({
      id: user._id,
      email: user.email,
      name: user.name,
    }).code(200);
  } catch (e) {
    const error = e as Error;

    return h.response({
      error: error.message,
    }).code(500);
  }
};

export default makeGetUserById;
