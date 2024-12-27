const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');

// Create a new visitor
router.post('/', async (req, res) => {
    try {
        const { name, email } = req.body;

        // Ensure email is unique
        const existingVisitor = await Visitor.findOne({ email });
        if (existingVisitor) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Create and save the new visitor
        const newVisitor = new Visitor({
            name,
            email,
        });

        const savedVisitor = await newVisitor.save();
        res.status(201).json(savedVisitor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all visitors and the count of attractions they have reviewed
router.get('/activity', async (req, res) => {
    try {
        const visitors = await Visitor.aggregate([
            {
                $lookup: {
                    from: 'reviews',
                    localField: '_id',
                    foreignField: 'visitor',
                    as: 'reviews',
                },
            },
            {
                $project: {
                    name: 1,
                    email: 1,
                    reviewedAttractionsCount: { $size: '$reviews' },
                },
            },
        ]);
        res.json(visitors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
