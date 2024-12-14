import React from 'react';
import Navbar from './components/Navbar';
import MarkAllReadButton from "./components/MarkAllReadButton";
import NotificationList from './components/NotificationList';
import { markAllAsRead } from './services/notificationService';

const NotificationsPage = () => {
  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
    window.location.reload();
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-center text-2xl font-bold py-4">Notifications</h1>
      <MarkAllReadButton markAllAsRead={handleMarkAllAsRead} className="sticky"/>
      <NotificationList />
    </div>
  );
};

export default NotificationsPage;
