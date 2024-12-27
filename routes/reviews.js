const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');
const Attraction = require('../models/Attraction');
const Review = require('../models/Review');

// Create a new review
router.post('/', async (req, res) => {
    try {
        const { visitorId, attractionId, score, comment } = req.body;

        // Find the visitor
        const visitor = await Visitor.findById(visitorId);
        if (!visitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }

        // Check if the visitor has visited the attraction
        if (!visitor.visitedAttractions.includes(attractionId)) {
            return res.status(400).json({ message: 'Visitor must visit the attraction before posting a review' });
        }

        // Check if the visitor has already reviewed the attraction
        const existingReview = await Review.findOne({ visitor: visitorId, attraction: attractionId });
        if (existingReview) {
            return res.status(400).json({ message: 'Visitor has already posted a review for this attraction' });
        }

        // Create a new review
        const newReview = new Review({
            attraction: attractionId,
            visitor: visitorId,
            score,
            comment,
        });

        const savedReview = await newReview.save();

        // Optionally update the attraction's rating (average rating calculation can be done here)
        const attraction = await Attraction.findById(attractionId);
        attraction.rating = await calculateAverageRating(attractionId);
        await attraction.save();

        res.status(201).json(savedReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Function to calculate the average rating for an attraction
const calculateAverageRating = async (attractionId) => {
    const reviews = await Review.find({ attraction: attractionId });
    const totalScore = reviews.reduce((acc, review) => acc + review.score, 0);
    return reviews.length > 0 ? totalScore / reviews.length : 0;
};

router.post('/', async (req, res) => {
    try {
        const { visitorId, attractionId, score, comment } = req.body;

        // Find the visitor
        const visitor = await Visitor.findById(visitorId);
        if (!visitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }

        // Check if the visitor has visited the attraction
        if (!visitor.visitedAttractions.includes(attractionId)) {
            return res.status(400).json({ message: 'Visitor must visit the attraction before posting a review' });
        }

        // Check if the visitor has already reviewed the attraction
        const existingReview = await Review.findOne({ visitor: visitorId, attraction: attractionId });
        if (existingReview) {
            return res.status(400).json({ message: 'Visitor has already posted a review for this attraction' });
        }

        // Create a new review
        const newReview = new Review({
            attraction: attractionId,
            visitor: visitorId,
            score,
            comment,
        });

        const savedReview = await newReview.save();

        // Update the attraction's rating
        const attraction = await Attraction.findById(attractionId);
        attraction.rating = await calculateAverageRating(attractionId);
        await attraction.save();

        res.status(201).json(savedReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
