import React from "react";
import Navbar from "../../components/nav-bar-login";
import SignUp from "../../components/SignUp";

/**
 * Renders a page for user sign ups.
 * @returns
 */
const UserSignUpPage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <SignUp route="user-login" userOrOrg={true} />
    </div>
  );
};

export default UserSignUpPage;
