import React from 'react';
import { FaHome } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faTv,
  faStore,
  faUserGroup
} from '@fortawesome/free-solid-svg-icons';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';

const Navbar = () => {
  return (
    <div className="sticky top-0 bg-gray-800 text-white flex items-center justify-between px-4 py-3 shadow-md z-50">
      {/* React Icon */}
      <FaHome className="text-xl cursor-pointer" />

      {/* FontAwesome Icons */}
      <FontAwesomeIcon icon={faUserGroup} className="text-xl cursor-pointer"/>
      <FontAwesomeIcon icon={faFacebookMessenger} className="text-xl cursor-pointer" />
      <FontAwesomeIcon icon={faBell} className="text-xl cursor-pointer" />
      <FontAwesomeIcon icon={faTv} className="text-xl cursor-pointer" />
      <FontAwesomeIcon icon={faStore} className="text-xl cursor-pointer"/>
    </div>
  );
};

export default Navbar;
