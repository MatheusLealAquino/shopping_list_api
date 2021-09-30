const { 
  login,
  getAll,
  getById,
  adminLogin,
} = require('../controllers/user.controller');

module.exports = [
  { method: 'POST', path: '/users/login', handler: login },
  { method: 'POST', path: '/users/admin/login', handler: adminLogin },
  { method: 'GET', path: '/users', handler: getAll, config: { auth: 'adminAuth' } },
  { method: 'GET', path: '/users/{id}', handler: getById, config: { auth: 'userAuth' } }
];
