const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String, required: true }, // e.g., 'like', 'comment', 'friend request', etc.
  read: { type: Boolean, default: false },
  name: { type: String, required: true }, // Name of the notification sender
  postContent: { type: String }, // Content of the post (only for comment and mention types)
  inviteEvent: { type: String }, // Name of the event for invite notifications
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
