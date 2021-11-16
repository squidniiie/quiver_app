const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    pirateName: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters long"]
    },
    imgUrl: {
        type: String,
        required: [true, "Please add an image link"]
    },
    numOfTreasure: {
        type: Number,
        required: [true, "Can't be a pirate with no treasure"],
        min: [1, "Can't join the crew without some booty"]
    },
    catchPhrase: {
        type: String,
        required: [true, "Please add a catchphrase"]
    },
    position: {
        type: String,
        enum: ['Captain', 'Quarter Master', 'Boatswain', 'First Mate', 'Powder Monkey'],
        required: [true, "State your position"]
    },
    pegLeg: {
        type: Boolean,
        required: true
    },
    eyePatch: {
        type: Boolean,
        required: [true, "Patchy"]
    },
    hookHand: {
        type: Boolean,
        required: [true, "Hooky"]
    }

}, { timestamps: true });
module.exports.User = mongoose.model('User', UserSchema);