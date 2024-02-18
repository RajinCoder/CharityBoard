import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-700 px-4 py-1 flex items-center justify-between fixed top-0 left-0 w-full h-[10%]">
      {/* CharityConnect Button */}
      <Link to="/" className="text-white font-bold text-2xl">
        CharityConnect
      </Link>
    </nav>
  );
};

export default Navbar;
