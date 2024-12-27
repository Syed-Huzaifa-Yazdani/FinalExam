const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
    },
    visitedAttractions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attraction',
    }],
});

module.exports = mongoose.model('Visitor', visitorSchema);
