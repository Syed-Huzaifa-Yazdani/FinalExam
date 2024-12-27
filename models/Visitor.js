const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Visitor name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email'],
    },
    visitedAttractions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Attraction',
        },
    ],
});

module.exports = mongoose.model('Visitor', visitorSchema);
