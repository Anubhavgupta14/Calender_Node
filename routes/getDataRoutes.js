const express = require('express');
const router = express.Router();
const getDataController = require('../controllers/getData');
const authMiddleware = require('../middlewares/authMiddleware');

// Protected routes requiring JWT authentication
router.get('/', authMiddleware, getDataController.getAllEvents);           // Get all events
router.get('/:id', authMiddleware, getDataController.getEventById);       // Get specific event
router.post('/', authMiddleware, getDataController.addEvent);             // Create new event
router.put('/:id', authMiddleware, getDataController.updateEvent);        // Edit specific event
router.delete('/:id', authMiddleware, getDataController.deleteEvent);     // Delete specific event

module.exports = router;
