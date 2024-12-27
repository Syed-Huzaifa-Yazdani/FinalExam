const express = require('express');
const router = express.Router();
const Attraction = require('../models/Attraction');

// Create a new attraction
router.post('/', async (req, res) => {
    try {
        const { name, location, entryFee } = req.body;

        // Validate the entryFee (it should be greater than 0)
        if (entryFee <= 0) {
            return res.status(400).json({ message: 'Entry fee must be greater than 0' });
        }

        const newAttraction = new Attraction({
            name,
            location,
            entryFee,
        });

        const savedAttraction = await newAttraction.save();
        res.status(201).json(savedAttraction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all attractions
router.get('/', async (req, res) => {
    try {
        const attractions = await Attraction.find();
        res.json(attractions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get the top-rated attractions
router.get('/top-rated', async (req, res) => {
    try {
        const topAttractions = await Attraction.find()
            .sort({ rating: -1 })
            .limit(5);
        res.json(topAttractions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
