const UserController = require('../controllers/user.controllers');
const { authenticate } = require('../config/jwt.config');
module.exports = function (app) {
    app.post('/api/new_user', authenticate, UserController.register);
    app.get('/api/users', UserController.getAllUsers);
    app.get('/api/users/:id', UserController.login);
    app.post('/api/users/logout', UserController.logout);
    app.put('/api/users/:id', UserController.updateUser);
    app.delete('/api/users/:id', UserController.deleteUser);
}