const express = require("express");
const Notification = require("../models/Notification");
const router = express.Router();
const mongoose = require('mongoose');
router.get("/notifications/unread", async (req, res) => {
    const { page = 1, limit = 10 } = req.query; 
  
    try {
      const notifications = await Notification.find({ read: false })
        .sort({ createdAt: -1 }) 
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
  console.log("id in the backend::",id)
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
  
    
    const io = req.io; 
  
    console.log("create route reached");
  
    
    let notificationData = {
      id: new mongoose.Types.ObjectId().toString(),
      type,
      name,
      createdAt: new Date(), 
    };
  
    
    switch (type) {
      
      case 'comment':
       
        notificationData.postContent = postContent; 
        break;
      case 'invite':
       
        notificationData.inviteEvent = inviteEvent; 
        break;
      
      case 'mention':
        
        notificationData.postContent = postContent; 
        break;
      default:
         console.log("invalid notification")
        break;
    }
  
    try {
      
      const notification = await Notification.create(notificationData);
  
      console.log("Notification created:", notification);
  
      
      io.emit("newNotification", notification);
  
      
      res.status(201).json(notification);
    } catch (error) {
      res.status(500).json({ message: "Notification creation failed: " + error.message });
    }
  });


  router.delete("/notifications/:id/delete", async (req, res) => {
    console.log("delete route reached.....")
    try {
      await Notification.findByIdAndDelete(req.params.id);
      res.sendStatus(200);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

module.exports = router;
