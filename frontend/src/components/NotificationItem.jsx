import React from 'react';

const NotificationItem = ({ notification }) => {
  const { type, name, postContent, inviteEvent, createdAt } = notification;

  // Format notification message based on type
  const getNotificationMessage = () => {
    switch (type) {
      case 'like':
        return `${name} liked your post.`;
      case 'comment':
        return `${name} commented on your post: "${postContent.slice(0, 300)}${
          postContent.length > 300 ? '...' : ''
        }"`;
      case 'invite':
        return `${name} invited you to ${inviteEvent}.`;
      case 'friend_request':
        return `${name} sent you a friend request.`;
      case 'post_update':
        return `${name} posted on Facebook.`;
      case 'mention':
        return `${name} mentioned you in a post.`;
      default:
        return 'You have a new notification.';
    }
  };

  // Format the date and time
  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`;
  };

  return (
    <div className="flex items-start p-4 border-b">
      <div className="flex-grow">
        <p className="font-bold">{getNotificationMessage()}</p>
        <p className="text-sm text-gray-500">{formatDateTime(createdAt)}</p>
      </div>
    </div>
  );
};

export default NotificationItem;
