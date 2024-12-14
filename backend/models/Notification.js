const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String, required: true }, // e.g., 'like', 'comment', 'friend request', etc.
  read: { type: Boolean, default: false },
  title: { type: String, required: true },
  name: { type: String, required: true }, // Name of the notification sender
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
