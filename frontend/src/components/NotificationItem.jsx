import React from 'react';

const NotificationItem = ({ notification }) => {
  return (
    <div className="flex items-center bg-white p-4 shadow-md rounded mb-2">
      <div className="flex-1">
        <p className="font-bold">{notification.title}</p>
        <p>{notification.name} - {notification.type}</p>
        <p className="text-gray-500 text-sm">{new Date(notification.date).toLocaleString()}</p>
      </div>
      <img
        src="https://via.placeholder.com/40"
        alt="User"
        className="rounded-full w-10 h-10"
      />
    </div>
  );
};

export default NotificationItem;
