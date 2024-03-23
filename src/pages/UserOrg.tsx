import { Link } from "react-router-dom";
import Navbar from "../components/nav-bar-login";

/**
 * Gives the user two options to sign in with, user or org.
 * @returns a page with user or login sign in buttons
 */
const UserOrg = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-8">
            Choose appropriate login option
          </h1>
          <div className="flex justify-center space-x-4">
            <Link
              to="/user-login"
              className="px-6 py-3 text-lg font-medium text-center text-white bg-blue-500 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              User Login
            </Link>
            <Link
              to="/organization-login"
              className="px-6 py-3 text-lg font-medium text-center text-white bg-blue-500 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Organization Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrg;
