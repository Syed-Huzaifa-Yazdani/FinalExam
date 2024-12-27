const mongoose = require('mongoose');

const attractionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Attraction name is required'],
        trim: true,
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true,
    },
    entryFee: {
        type: Number,
        required: [true, 'Entry fee is required'],
        min: [0, 'Entry fee must be greater than 0'],
    },
    rating: {
        type: Number,
        default: 0,
        min: [0, 'Rating cannot be less than 0'],
        max: [5, 'Rating cannot be greater than 5'],
    },
});

module.exports = mongoose.model('Attraction', attractionSchema);
