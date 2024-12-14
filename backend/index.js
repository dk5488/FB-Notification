const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const Notification = require('./models/Notification'); 
const connectDB = require('./db');
const dotenv = require('dotenv');
const routes=require('./Routes/routes')
const cors = require('cors');
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});
app.use(cors({
    origin: '*',           
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
  }));


connectDB();

// Middleware
app.use(express.json());
app.use('/api/v1', (req, res, next) => {
    req.io = io; 
    next();
  }, routes);


io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


Notification.watch().on('change', async (change) => {
  if (change.operationType === 'insert') {
    const newNotification = change.fullDocument;

    
    io.emit('notification', {
      id: newNotification._id,
      name: newNotification.name,
      type: newNotification.type,
      createdAt: newNotification.createdAt,
      postContent:newNotification.postContent || null,
      inviteEvent:newNotification.postContent || null,
      read:newNotification.read
    });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
