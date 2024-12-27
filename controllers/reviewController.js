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
