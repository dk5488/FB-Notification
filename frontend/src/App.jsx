import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:3000'); // Update the URL based on your server

const NotificationDropdown = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // Fetch unread notifications
    const fetchNotifications = async () => {
      const response = await axios.get(`/api/notifications/unread?userId=${userId}`);
      setNotifications(response.data);
    };

    fetchNotifications();

    // Listen for real-time updates
    socket.on('updateNotifications', (updatedNotifications) => {
      setNotifications(updatedNotifications);
    });
  }, [userId]);

  const markAsRead = async (id) => {
    await axios.patch(`/api/notifications/${id}/mark-read`);
    setNotifications((prev) => prev.filter((notif) => notif._id !== id));
  };

  const markAllAsRead = async () => {
    await axios.patch('/api/notifications/mark-all-read', { userId });
    setNotifications([]);
  };

  return (
    <div className="relative bg-black">
      <button onClick={() => setDropdownOpen(!dropdownOpen)} className="p-2 bg-blue-500 text-white rounded-full">
        🔔
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <button onClick={markAllAsRead} className="text-sm text-blue-500">
              Mark all as read
            </button>
          </div>
          <div className="mt-2">
            {notifications.length ? (
              notifications.map((notif) => (
                <div
                  key={notif._id}
                  className="flex justify-between items-center p-2 border-b hover:bg-gray-100"
                >
                  <div>
                    <p className="text-sm font-medium">{notif.title}</p>
                    <p className="text-xs text-gray-500">{notif.name}</p>
                  </div>
                  <button
                    onClick={() => markAsRead(notif._id)}
                    className="text-xs text-blue-500"
                  >
                    Mark as read
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No unread notifications</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
