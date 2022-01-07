const mongoose = require('mongoose');
const SpotSchema = new mongoose.Schema({
    imgUrl: {
        type: String,
        // required: [true, "Please add an image link"]
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        unique: true,
        minlength: [3, "Name must be at least 3 characters long"]
    },
    location: {
        type: String,
        required: [true, "Location is required"],
        minlength: [3, "Location must be at least 3 characters long"]
    },
    level: {
        type: String,
        enum: ['Beginner', 'Newbie', 'Weekend Warrior', 'Skilled', 'Blessed'],
        required: [true, 'State your skill level']
    },
    board: {
        type: String,
        enum: ['shortboard', 'longboard'],
        required: [true, 'State your preferred board']
    },
    breakType: {
        type: String,
        enum: ['beachbreak', 'pointbreak', 'reefbreak'],
        required: [true, 'State the break type']
    }
});
module.exports.Spot = mongoose.model('Spot', SpotSchema);