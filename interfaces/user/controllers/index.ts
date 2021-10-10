import userService from '../../../application/user';
import makePostUser from './post-user';

const postUser = makePostUser({
  addUser: userService.addUser,
});

const postController = Object.freeze({
  postUser,
});

export default postController;
