const Event = require('../models/Events');

// Get all events for the logged-in user
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({ userId: req.userId });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch events', error });
  }
};

// Get a specific event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id, userId: req.userId });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch event', error });
  }
};

// Add a new event
exports.addEvent = async (req, res) => {
  try {
    const { title, date, time, description } = req.body;
    const event = new Event({ title, date, time, description, userId: req.userId });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add event', error });
  }
};

// Update an existing event by ID
exports.updateEvent = async (req, res) => {
  try {
    const { title, date, time, description } = req.body;
    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { title, date, time, description },
      { new: true, runValidators: true }
    );
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update event', error });
  }
};

// Delete an event by ID
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete event', error });
  }
};
