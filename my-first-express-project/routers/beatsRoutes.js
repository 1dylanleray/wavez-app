const express = require('express');
const router = express.Router();
const beatsController = require('../controllers/beatsController');

// Endpoint pour récupérer la liste des beats
router.get('/beats', beatsController.getAllBeats);

module.exports = router;
