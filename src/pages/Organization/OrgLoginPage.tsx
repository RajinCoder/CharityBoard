import React from "react";
import Navbar from "../../components/nav-bar-login";
import LogIn from "../../components/LogIn";

/**
 * Renders a page for the organization to login.
 * @returns
 */
const OrgLoginPage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <LogIn userOrOrg={false} />
    </div>
  );
};

export default OrgLoginPage;
