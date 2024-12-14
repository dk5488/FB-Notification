const express = require("express");
const Notification = require("../models/Notification");
const router = express.Router();
const mongoose = require('mongoose');
router.get("/notifications/unread", async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Get page and limit from query params, with defaults
  
    try {
      const notifications = await Notification.find({ read: false })
        .sort({ createdAt: -1 }) // Latest notifications first
        .skip((page - 1) * limit) // Skip notifications for previous pages
        .limit(parseInt(limit)); // Limit the results per page
  
      const total = await Notification.countDocuments({ read: false }); // Total unread notifications
  
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
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json({ message: "Notification marked as read", notification });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/notifications/mark-all-read", async (req, res) => {
  try {
    await Notification.updateMany({ read: false }, { read: true });
    res.json({ message: "All notifications marked as read" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/notifications/create", async (req, res) => {
    const { type, name, postContent, inviteEvent } = req.body;
  
    // Ensure io is available via server setup or passed in
    const io = req.io; // Using Express app's .get to access io instance
  
    console.log("create route reached");
  
    // Initialize the notification base data
    let notificationData = {
      id: new mongoose.Types.ObjectId().toString(),
      type,
      name,
      createdAt: new Date(), // Add timestamp
    };
  
    // Add additional fields based on the type of notification
    switch (type) {
      
      case 'comment':
       
        notificationData.postContent = postContent; // Content of the post for reference
        break;
      case 'invite':
       
        notificationData.inviteEvent = inviteEvent; // Event name for the invite
        break;
      
      case 'mention':
        
        notificationData.postContent = postContent; // Content of the post for reference
        break;
      default:
         console.log("invalid notification")
        break;
    }
  
    try {
      // Create the notification in the database
      const notification = await Notification.create(notificationData);
  
      console.log("Notification created:", notification);
  
      // Emit the notification to all connected clients
      io.emit("newNotification", notification);
  
      // Respond with the created notification
      res.status(201).json(notification);
    } catch (error) {
      res.status(500).json({ message: "Notification creation failed: " + error.message });
    }
  });

module.exports = router;
