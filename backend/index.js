const http = require('http');
const { Server } = require('socket.io');
const Notification = require('./models/Notification');
const connectDB = require('./db');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use('/api/notifications', require('./routes/notifications'));

// WebSocket Connection
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
