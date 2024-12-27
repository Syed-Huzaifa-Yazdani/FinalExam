const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    attraction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attraction',
        required: [true, 'Attraction reference is required'],
    },
    visitor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visitor',
        required: [true, 'Visitor reference is required'],
    },
    score: {
        type: Number,
        required: [true, 'Score is required'],
        min: [1, 'Score must be at least 1'],
        max: [5, 'Score cannot exceed 5'],
    },
    comment: {
        type: String,
        trim: true,
    },
});

module.exports = mongoose.model('Review', reviewSchema);
