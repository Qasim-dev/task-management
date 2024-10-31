const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { authenticate, isAdmin } = require('../middleware/authMiddleware.js');
// Get tasks with filtering - Admin sees all tasks, users only see their tasks
router.get('/', authenticate, async (req, res) => {
  try {
    const { priority, status } = req.query;
    const query = { ...priority && { priority }, ...status && { status } };

    // Users can only see their own tasks, Admin can see all tasks
    if (req.user.role === 'user') query.createdBy = req.user._id;

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin creates a task and assigns it to a specific user
router.post('/', authenticate, isAdmin, async (req, res) => {
  const { title, description, priority, status, createdBy } = req.body;
  const task = new Task({
    title,
    description,
    priority,
    status,
    createdBy: createdBy || req.user._id
  });

  try {
    const newTask = await task.save();
    res.status(200).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Admin updates a task
router.patch('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a task - Admin only
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json({ message: 'Task deleted successfully.'});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Change task status - Users can only change the status of their tasks
router.post('/:id', authenticate, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Allow task status change only if admin or the task belongs to the user
    if (req.user.role === 'admin' || task.createdBy.equals(req.user._id)) {
      task.status = req.body.status;
      const updatedTask = await task.save();
      res.status(200).json(updatedTask);
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

module.exports = router;
