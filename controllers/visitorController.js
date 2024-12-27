const Visitor = require('../models/Visitor');

exports.createVisitor = async (req, res) => {
    try {
        const { name, email } = req.body;
        const visitor = new Visitor({ name, email });
        await visitor.save();
        res.status(201).json(visitor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Add a new visitor
const addVisitor = async (req, res) => {
    try {
        const { name, email } = req.body;

        // Ensure email is unique and valid
        const existingVisitor = await Visitor.findOne({ email });
        if (existingVisitor) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Create and save the visitor
        const newVisitor = new Visitor({ name, email });
        const savedVisitor = await newVisitor.save();
        res.status(201).json(savedVisitor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Activity report: List visitors with their reviewed attractions count
const getVisitorActivity = async (req, res) => {
    try {
        const visitors = await Visitor.aggregate([
            {
                $lookup: {
                    from: 'reviews',
                    localField: '_id',
                    foreignField: 'visitor',
                    as: 'reviews',
                }
            },
            {
                $project: {
                    name: 1,
                    email: 1,
                    reviewedAttractionsCount: { $size: '$reviews' },
                }
            }
        ]);
        res.json(visitors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
