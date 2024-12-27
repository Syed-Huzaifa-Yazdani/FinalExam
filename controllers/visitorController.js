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
