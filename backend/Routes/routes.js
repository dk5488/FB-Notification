const express = require("express");
const Notification = require("../models/Notification");
const router = express.Router();

router.get("/notifications/unread", async (req, res) => {
    const  page = 1, limit = 10 ; // Pagination parameters

    try {
      const notifications = await Notification.find({ read: false })
        .sort({ createdAt: -1 }) // Latest notifications first
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
  
      const total = await Notification.countDocuments({ read: false });
  
      res.json({
        notifications,
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

router.put("/notifications/:id/mark-read", async (req, res) => {
    const { id } = req.params;

  try {
    const notification = await Notification.findOneAndUpdate(
      { id },
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.json({ message: 'Notification marked as read', notification });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/notifications/mark-all-read", async (req, res) => {
    try {
        await Notification.updateMany({ read: false }, { read: true });
        res.json({ message: 'All notifications marked as read' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
});

router.post('/notifications/create', async (req, res) => {
    const { type, title, name } = req.body;
  
    try {
      const notification = await Notification.create({
        id: new mongoose.Types.ObjectId().toString(),
        type,
        title,
        name,
      });
  
      // Emit the notification to connected clients
      io.emit('newNotification', notification);
  
      res.status(201).json(notification);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;
