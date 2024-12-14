import axiosInstance from './axiosInstance';
import { io } from 'socket.io-client';

export const getUnreadNotifications = async (page = 1, limit = 10) => {
    try {
      const response = await axiosInstance.get(`/notifications/unread?page=${page}&limit=${limit}`);
      return response.data; 
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
    const socket = io('https://fb-notification-backend1.onrender.com'); 
  
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });
  
    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });
  
    socket.on('notification', (notification) => {
      console.log('Received notification:', notification);
      callback(notification);
    });
  
    return socket;
  };


  export const markNotificationAsRead = async (id) => {
    await axiosInstance.put(`/notifications/${id}/mark-read`);
  };
  
  export const deleteNotification = async (id) => {
    await axiosInstance.delete(`/notifications/${id}/delete`);
  };
