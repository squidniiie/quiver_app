const UserController = require('../controllers/user.controllers');
const { authenticate } = require('../config/jwt.config');
module.exports = function (app) {
    app.post('/api/new_user', UserController.register);
    app.get('/api/users', authenticate, UserController.getAllUsers);
    app.post('/api/users/login', UserController.login);
    app.post('/api/users/logout', UserController.logout);
    app.put('/api/users/:id', UserController.updateUser);
    app.delete('/api/users/:id', UserController.deleteUser);
}