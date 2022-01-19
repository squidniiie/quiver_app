const SpotController = require('../controllers/spot.controller');
const { authenticate } = require('../config/jwt.config');
module.exports = function (app) {
    app.post('/api/new_spot', authenticate, SpotController.createSpot);
    app.get('/api/spots', SpotController.getAllSpots);
    app.get('/api/spots/:id', SpotController.getSpot);
    app.put('/api/spots/:id', authenticate, SpotController.updateSpot);
    app.delete('/api/spots/:id', authenticate, SpotController.deleteSpot);
}