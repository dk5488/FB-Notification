const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String, required: true }, 
  read: { type: Boolean, default: false },
  name: { type: String, required: true }, 
  postContent: { type: String }, 
  inviteEvent: { type: String }, 
  createdAt: { type: Date, default: Date.now }, 
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
