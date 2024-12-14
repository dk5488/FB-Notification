import React from 'react';

const MarkAllReadButton = ({ markAllAsRead }) => {
  return (
    <div className="bg-gray-100 p-4 flex justify-center">
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600"
        onClick={markAllAsRead}
      >
        Mark All as Read
      </button>
    </div>
  );
};

export default MarkAllReadButton;
