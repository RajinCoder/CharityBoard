import React, { useState, useRef, useEffect } from 'react';

const Navbar = () => {
  // State for managing dropdown menu visibility
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  // Reference to the pin button
  const pinButtonRef = useRef<HTMLButtonElement>(null); // Specify the type here

  // Distance options
  const distanceOptions = ["5 miles", "10 miles", "25 miles", "50 miles", "100+ miles"];

  // Function to toggle dropdown menu visibility
  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

  // Handle click on distance option
  const handleDistanceClick = (distance: string) => {
    console.log(`Selected distance: ${distance}`);
    // You can perform other actions here based on the selected distance
  };

  // Calculate dropdown position
  useEffect(() => {
    if (pinButtonRef.current) {
      const { top, left, height } = pinButtonRef.current.getBoundingClientRect();
      setDropdownPosition({ top: top + height, left });
    }
  }, [isDropdownVisible]);

  return (
    <nav className="bg-blue-700 px-4 py-1 flex items-center justify-between fixed top-0 left-0 w-full h-[10%]">
      {/* CharityConnect Text */}
      <span className="text-white font-bold text-2xl">CharityConnect</span>

      {/* Search Bar */}
      <div className="flex items-center border-2 border-blue-500 bg-white rounded-md ml-4 flex-grow">
        {/* Magnifying Glass Icon Button */}
        <button className="p-2">
          <svg className="w-6 h-6 text-blue-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M15.5 14.5L20 18"></path>
            <circle cx="9.5" cy="11.5" r="6"></circle>
          </svg>
        </button>

        {/* Input Field */}
        <input className="p-2 flex-grow rounded-md" type="text" placeholder="Search for charities..." />

        {/* Pin Icon Button with Toggle Dropdown */}
        <button className="p-2" onClick={toggleDropdown} ref={pinButtonRef}>
          <img src="https://cdn-icons-png.freepik.com/512/7310/7310018.png" alt="Location" className="w-6 h-6" />
        </button>

        {/* Dropdown Menu with Distance Options */}
        {isDropdownVisible && (
          <div className="absolute mt-2 left-0 bg-white shadow-lg rounded-md z-10" style={{ top: dropdownPosition.top, left: dropdownPosition.left }}>
            <ul>
              {distanceOptions.map((distance) => (
                <li key={distance} className="p-2 hover:bg-blue-500 hover:text-white cursor-pointer" onClick={() => handleDistanceClick(distance)}>
                  {distance}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div>
        <button className="text-white mx-2 ring-1 ring-white rounded-md px-3 py-1 hover:bg-white hover:text-blue-500 transition-colors">Favorites</button>
        <button className="text-white mx-2 ring-1 ring-white rounded-md px-3 py-1 hover:bg-white hover:text-blue-500 transition-colors">Following</button>
        <button className="text-white mx-2 ring-1 ring-white rounded-md px-3 py-1 hover:bg-white hover:text-blue-500 transition-colors">Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
