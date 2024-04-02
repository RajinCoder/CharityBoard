import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../config/supabaseClient";

interface Props {
  onSearchTermChange: (searchTerm: string) => void;
}
const Navbar = ({ onSearchTermChange }: Props) => {
  // State for managing dropdown menu visibility
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [loggedIn, setLoggedIn] = useState(false);

  // Reference to the pin button
  const pinButtonRef = useRef<HTMLButtonElement>(null); // Specify the type here

  // Distance options
  const distanceOptions = [
    "5 miles",
    "10 miles",
    "25 miles",
    "50 miles",
    "100+ miles",
  ];

  /**
   * Returns the term being typed.
   * @param event typing in the search bar
   */
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(event.target.value);
  };

  /**
   * Refreshes the screen
   */
  const handleRefresh = () => {
    window.location.reload();
  };

  /**
   * Logs the user out.
   */
  const logOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error("Error logging out");
    } else {
      setLoggedIn(false);
      handleRefresh();
    }
  };

  useEffect(() => {
    /**
     * Gets the session data of the user to see if they're logged in.
     */
    const checkLoginStatus = async () => {
      const { data: session, error } = await supabase.auth.getSession();

      if (error) {
        throw new Error("Error checking login status");
      }
      if (session.session == null) {
        setLoggedIn(false);
      } else {
        setLoggedIn(true);
      }
    };
    checkLoginStatus();
  }, []);

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
      const { top, left, height } =
        pinButtonRef.current.getBoundingClientRect();
      setDropdownPosition({ top: top + height, left });
    }
  }, [isDropdownVisible]);

  return (
    <nav className="bg-blue-700 px-4 py-1 flex items-center justify-between fixed top-0 left-0 w-full h-[10%]">
      {/* CharityConnect Text */}
      <Link to="/" className="text-white font-bold text-2xl">
        CharityConnect
      </Link>

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
          className="p-2 flex-grow rounded-md"
          type="text"
          placeholder="Search for charities..."
          onChange={handleSearchChange}
        />

        {/* Pin Icon Button with Toggle Dropdown */}
        <button className="p-2" onClick={toggleDropdown} ref={pinButtonRef}>
          <img
            src="https://cdn-icons-png.freepik.com/512/7310/7310018.png"
            alt="Location"
            className="w-6 h-6"
          />
        </button>

        {/* Dropdown Menu with Distance Options */}
        {isDropdownVisible && (
          <div
            className="absolute mt-2 left-0 bg-white shadow-lg rounded-md z-10"
            style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
          >
            <ul>
              {distanceOptions.map((distance) => (
                <li
                  key={distance}
                  className="p-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                  onClick={() => handleDistanceClick(distance)}
                >
                  {distance}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div>
        <Link
          to="/favorites"
          className="text-white mx-2 ring-1 ring-white rounded-md px-3 py-1.5 hover:bg-white hover:text-blue-500 transition-colors"
        >
          Favorites
        </Link>
        <Link
          to="/following"
          className="text-white mx-2 ring-1 ring-white rounded-md px-3 py-1.5 hover:bg-white hover:text-blue-500 transition-colors"
        >
          Following
        </Link>
        {loggedIn == false ? (
          <Link
            to="/user-or-org"
            className="text-white mx-2 ring-1 ring-white rounded-md px-3 py-1.5 hover:bg-white hover:text-blue-500 transition-colors"
          >
            Login
          </Link>
        ) : (
          <button
            onClick={logOut}
            className="text-white mx-2 ring-1 ring-white rounded-md px-3 py-1 hover:bg-white hover:text-blue-500 transition-colors"
          >
            Log out
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
