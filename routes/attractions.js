const express = require('express');
const { getAllAttractions, createAttraction } = require('../controllers/attractionController');

const router = express.Router();

router.get('/', getAllAttractions);
router.post('/', createAttraction);

module.exports = router;
