const Review = require('../models/Review');
const Attraction = require('../models/Attraction');

exports.createReview = async (req, res) => {
    try {
        const { attraction, visitor, score, comment } = req.body;
        const review = new Review({ attraction, visitor, score, comment });
        await review.save();

        // Update attraction's rating
        const reviews = await Review.find({ attraction });
        const averageRating = (reviews.reduce((sum, r) => sum + r.score, 0) / reviews.length).toFixed(1);

        await Attraction.findByIdAndUpdate(attraction, { rating: averageRating });
        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Add a review
const addReview = async (req, res) => {
    try {
        const { visitorId, attractionId, score, comment } = req.body;

        // Check if visitor exists
        const visitor = await Visitor.findById(visitorId);
        if (!visitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }

        // Ensure visitor has visited the attraction
        if (!visitor.visitedAttractions.includes(attractionId)) {
            return res.status(400).json({ message: 'Visitor must visit the attraction before posting a review' });
        }

        // Ensure visitor hasn't reviewed this attraction
        const existingReview = await Review.findOne({ visitor: visitorId, attraction: attractionId });
        if (existingReview) {
            return res.status(400).json({ message: 'Visitor has already posted a review for this attraction' });
        }

        // Create and save the review
        const newReview = new Review({ attraction: attractionId, visitor: visitorId, score, comment });
        const savedReview = await newReview.save();

        // Update attraction's rating
        const attraction = await Attraction.findById(attractionId);
        attraction.rating = await calculateAverageRating(attractionId);
        await attraction.save();

        res.status(201).json(savedReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to calculate average rating
const calculateAverageRating = async (attractionId) => {
    const reviews = await Review.find({ attraction: attractionId });
    const totalScore = reviews.reduce((acc, review) => acc + review.score, 0);
    return reviews.length > 0 ? totalScore / reviews.length : 0;
};
