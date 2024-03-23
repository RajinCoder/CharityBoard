import React from "react";
import Navbar from "../../components/nav-bar-login";
import SignUp from "../../components/SignUp";

/**
 * Renders a page for the orginization sign up.
 * @returns
 */
const OrgSignUpPage: React.FC = () => {
  return (
    <div className="relative bg-gray-100 min-h-screen">
      <Navbar />
      <SignUp userOrOrg={false} route={"organization-login"} />
    </div>
  );
};

export default OrgSignUpPage;
