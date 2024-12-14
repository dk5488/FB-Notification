import axiosInstance from './axiosInstance';
import { io } from 'socket.io-client';

export const getUnreadNotifications = async (page = 1, limit = 10) => {
    try {
      const response = await axiosInstance.get(`/notifications/unread?page=${page}&limit=${limit}`);
      return response.data; // Includes notifications, total, page, and pages
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return { notifications: [], total: 0, page, pages: 0 };
    }
  };
  

export const markAllAsRead = async () => {
  try {
    await axiosInstance.put('/notifications/mark-all-read');
  } catch (error) {
    console.error('Error marking notifications as read:', error);
  }
};

export const listenForNotifications = (callback) => {
  const socket = io('http://localhost:5000'); // Adjust according to backend WebSocket server

  socket.on('notification', (notification) => {
    callback(notification);
  });

  return socket;
};
