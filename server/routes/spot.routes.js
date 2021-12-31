const SpotController = require('../controllers/spot.controller');
module.exports = function (app) {
    app.post('/api/new_spot', SpotController.createSpot);
    app.get('/api/spots', SpotController.getAllSpots);
    app.get('/api/spots/:id', SpotController.getSpot);
    app.put('/api/spots/:id', SpotController.updateSpot);
    app.delete('/api/spots/:id', SpotController.deleteSpot);
}