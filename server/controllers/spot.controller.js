const { Spot } = require('../models/spot.model');
const { response } = require('express');


// Create method:
module.exports.createSpot = (request, response) => {
    Spot.create(request.body)
        .then(spot => response.json(spot))
        .catch(err => response.status(400).json(err))
}
// Retrieve methods: 
module.exports.getSpot = (request, response) => {
    Spot.findOne({ _id: request.params.id })
        .then(spot => response.json(spot))
        .catch(err => response.json(err))
}
module.exports.getAllSpots = (request, response) => {
    Spot.find({}).sort({ name: 1 })
        .then(spots => response.json(spots))
        .catch(err => response.json(err))
}

// Update method:
module.exports.updateSpot = (request, response) => {
    Spot.findOneAndUpdate({ _id: request.params.id }, request.body, { runValidators: true, new: true })
        .then(updatedSpot => response.json(updatedSpot))
        .catch(err => response.status(400).json(err))
}
// Delete method:
module.exports.deleteSpot = (request, response) => {
    Spot.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}