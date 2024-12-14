import React from 'react';
import { FaHome, FaBell, FaComments, FaTv, FaShoppingBag } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className="sticky top-0 bg-gray-800 text-white flex items-center justify-between px-4 py-3 shadow-md z-50">
      <FaHome className="text-xl cursor-pointer" />
      <FaBell className="text-xl cursor-pointer" />
      <FaComments className="text-xl cursor-pointer" />
      <FaTv className="text-xl cursor-pointer" />
      <FaShoppingBag className="text-xl cursor-pointer" />
    </div>
  );
};

export default Navbar;
