const UserController = require('../controllers/user.controllers');
module.exports = function (app) {
    app.post('/api/new_user', UserController.createUser);
    app.get('/api/users', UserController.getAllUsers);
    app.get('/api/users/:id', UserController.getUser);
    app.put('/api/users/:id', UserController.updateUser);
    app.delete('/api/users/:id', UserController.deleteUser);
}