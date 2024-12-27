const Attraction = require('../models/Attraction');

exports.getAllAttractions = async (req, res) => {
    try {
        const attractions = await Attraction.find();
        res.json(attractions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createAttraction = async (req, res) => {
    try {
        const { name, location, entryFee } = req.body;
        const attraction = new Attraction({ name, location, entryFee });
        await attraction.save();
        res.status(201).json(attraction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Add a new attraction
const addAttraction = async (req, res) => {
    try {
        const { name, location, entryFee } = req.body;

        // Validate entryFee
        if (entryFee <= 0) {
            return res.status(400).json({ message: 'Entry fee must be greater than 0' });
        }

        const newAttraction = new Attraction({ name, location, entryFee });
        const savedAttraction = await newAttraction.save();
        res.status(201).json(savedAttraction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Top rated attractions
const getTopRatedAttractions = async (req, res) => {
    try {
        const topAttractions = await Attraction.find()
            .sort({ rating: -1 })
            .limit(5);
        res.json(topAttractions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
