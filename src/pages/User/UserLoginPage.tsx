import React from "react";
import Navbar from "../../components/nav-bar-login";
import LogIn from "../../components/LogIn";

/**
 * Renders a page for the user to login.
 * @returns
 */
const UserLoginPage: React.FC = () => {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <LogIn userOrOrg={true} />
    </div>
  );
};

export default UserLoginPage;
