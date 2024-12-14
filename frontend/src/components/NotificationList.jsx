import React, { useEffect, useState } from 'react';
import NotificationItem from './NotificationItem';
import { getUnreadNotifications, listenForNotifications } from '../services/notificationService';

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await getUnreadNotifications();
      setNotifications(data);
    };

    fetchNotifications();

    // Set up WebSocket to listen for new notifications
    const socket = listenForNotifications((newNotification) => {
      setNotifications((prev) => [newNotification, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="p-4">
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default NotificationList;
