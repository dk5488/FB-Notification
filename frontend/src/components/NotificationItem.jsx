import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import placeholder from "../placeholder.png"
const NotificationItem = ({ notification, onMarkAsRead, onDelete }) => {
  const { type, name, postContent, inviteEvent, createdAt, read } = notification;

  const getNotificationMessage = () => {
    switch (type) {
      case "like":
        return `${name} liked your post.`;
      case "comment":
        return `${name} commented on your post:`;
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

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  return (
    <div className="flex items-center p-5 border-b">
      {/* Left Circular Icon */}
       <img alt="User" className={`w-16 h-16 rounded-full flex-shrink-0`} src={placeholder}/>

      {/* Right Notification Content */}
      <div className="ml-6 flex-grow">
        <p className={`font-semibold text-base ${read ? "text-gray-500" : ""}`}>
          {getNotificationMessage()}
        </p>

        {/* Conditional Rendering for Comment, Mention, Invite */}
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

      
      <div className="flex space-x-4 relative">
        
        <div className="group relative">
          <FontAwesomeIcon
            icon={faCircleCheck}
            className="text-green-500 cursor-pointer"
            onClick={() => onMarkAsRead(notification.id)}
          />
          <span className=" z-10 absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-black text-white rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-24">
            Mark as Read
          </span>
        </div>

        
        <div className="group relative">
          <FontAwesomeIcon
            icon={faTrashCan}
            className="text-red-500 cursor-pointer"
            onClick={() => onDelete(notification.id)}
          />
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-black text-white rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Delete
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
