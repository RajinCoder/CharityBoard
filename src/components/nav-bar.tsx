const Navbar = () => {
  return (
    <nav className="bg-blue-700 px-4 py-1 flex items-center justify-between fixed top-0 left-0 w-full h-[10%]">
      {/* CharityConnect Text */}
      <span className="text-white font-bold text-2xl">CharityConnect</span>

      {/* Search Bar */}
      <div className="flex items-center border-2 border-blue-500 bg-white rounded-md ml-4 flex-grow">
        {/* Magnifying Glass Icon Button */}
        <button className="p-2">
          <svg
            className="w-6 h-6 text-blue-500"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M15.5 14.5L20 18"></path>
            <circle cx="9.5" cy="11.5" r="6"></circle>
          </svg>
        </button>

        {/* Input Field */}
        <input
          className="p-2 flex-grow rounded-md" // Full width within the flex container
          type="text"
          placeholder="Search for charities..."
        />

        {/* Pin Icon Button */}
        <button className="p-2">
          <img
            src="https://cdn-icons-png.freepik.com/512/7310/7310018.png"
            alt="Location"
            className="w-6 h-6"
          />{" "}
          {/* Adjusted size */}
        </button>
      </div>

      {/* Action Buttons */}
      <div>
        <button className="text-white mx-2 ring-1 ring-white rounded-md px-3 py-1 hover:bg-white hover:text-blue-500 transition-colors">
          Favorites
        </button>
        <button className="text-white mx-2 ring-1 ring-white rounded-md px-3 py-1 hover:bg-white hover:text-blue-500 transition-colors">
          Saved
        </button>
        <button className="text-white mx-2 ring-1 ring-white rounded-md px-3 py-1 hover:bg-white hover:text-blue-500 transition-colors">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
