import React, { useEffect, useState } from 'react';
import NotificationItem from './NotificationItem';
import { 
  getUnreadNotifications, 
  listenForNotifications, 
  markNotificationAsRead, 
  deleteNotification 
} from '../services/notificationService';

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (isLoading || page > totalPages) return;

      setIsLoading(true);
      const data = await getUnreadNotifications(page, 10);
      console.log('getUnreadNotifications Data::', data);

      setNotifications((prev) => {
        const newNotifications = data.notifications.filter(
          (notif) => !prev.some((existing) => existing.id === notif.id)
        );
        return [...prev, ...newNotifications];
      });

      setTotalPages(data.pages);
      setIsLoading(false);
    };

    fetchNotifications();
  }, [page]);

  useEffect(() => {
    const socket = listenForNotifications((newNotification) => {
      setNotifications((prev) => {
        const exists = prev.some((notif) => notif.id === newNotification.id);
        return exists ? prev : [newNotification, ...prev];
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log('Reload');
  }, [notifications]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollHeight - scrollTop <= clientHeight + 100 && page < totalPages && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page, totalPages, isLoading]);

  const handleMarkAsRead = async (id) => {
    console.log("id:::", id);
    await markNotificationAsRead(id);
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const handleDelete = async (id) => {
    await deleteNotification(id);
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <div className="p-4">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkAsRead={handleMarkAsRead}
          onDelete={handleDelete}
        />
      ))}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default NotificationList;
