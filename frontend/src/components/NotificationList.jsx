import React, { useEffect, useState } from 'react';
import NotificationItem from './NotificationItem';
import { getUnreadNotifications, listenForNotifications } from '../services/notificationService';

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
      setNotifications((prev) => [...prev, ...data.notifications]); // Append new notifications
      setTotalPages(data.pages);
      setIsLoading(false);
    };

    fetchNotifications();
  }, [page]); // Fetch data whenever page changes

  useEffect(() => {
    // Set up WebSocket to listen for new notifications
    const socket = listenForNotifications((newNotification) => {
      setNotifications((prev) => [newNotification, ...prev]); // Add new notifications to the top
    });

    return () => {
      socket.disconnect(); // Clean up WebSocket on component unmount
    };
  }, []);

  // Infinite scroll handler
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollHeight - scrollTop <= clientHeight + 100 && page < totalPages && !isLoading) {
      setPage((prevPage) => prevPage + 1); // Increment page when nearing the bottom
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page, totalPages, isLoading]);

  return (
    <div className="p-4">
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default NotificationList;
