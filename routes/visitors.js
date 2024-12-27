const express = require('express');
const { createVisitor } = require('../controllers/visitorController');

const router = express.Router();

router.post('/', createVisitor);

module.exports = router;
