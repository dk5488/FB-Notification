import React from "react";

const NotificationItem = ({ notification }) => {
  const { type, name, postContent, inviteEvent, createdAt } = notification;

  // Format notification message based on type
  const getNotificationMessage = () => {
    switch (type) {
      case "like":
        return `${name} liked your post.`;
      case "comment":
        return `${name} commented on your post:`
      case "invite":
        return `${name} invited you to ${inviteEvent}.`;
      case "request":
        return `${name} sent you a friend request.`;
      case "post_update":
        return `${name} posted on Facebook.`;
      case "mention":
        return `${name} mentioned you in a post:`;
      default:
        return "You have a new notification.";
    }
  };

  // Format the date and time
  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  return (
    <div className="flex items-center p-5">
      {/* Left Circular Icon */}
      <div className="w-16 h-16 rounded-full bg-gray-300 flex-shrink-0"></div>

      {/* Right Notification Content */}
      <div className="ml-6 flex-grow">
        {/* Notification Message */}
        <p className="font-semibold text-base">{getNotificationMessage()}</p>

        {/* Special Handling for Comment and Mention */}
        {type === "comment" && (
          <p className="text-base text-gray-700 italic">{postContent}</p>
        )}
        {type === "mention" && (
          <p className="text-base text-gray-700 italic">{postContent}</p>
        )}
        {type === "invite" && (
          <p className="text-base text-gray-700 italic">{inviteEvent}</p>
        )}

        {/* Date */}
        <p className="text-sm text-gray-500 mt-1">{formatDateTime(createdAt)}</p>
      </div>
    </div>
  );
};

export default NotificationItem;
