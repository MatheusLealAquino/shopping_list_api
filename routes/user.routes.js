const { 
  getUsers,
  getUserById,
} = require('../controllers/user.controller');

module.exports = [
  { method: 'GET', path: '/users', handler: getUsers, config: { auth: 'userAuth' } },
  { method: 'GET', path: '/users/{id}', handler: getUserById }
];
