import OrgSignUpDetails from "../../components/OrgSignUpDetails";
import Navbar from "../../components/nav-bar-login";

/**
 * Renders a page for the organization additional sign up details page.
 * @returns
 */
const OrgSignUpAdditionalPage = () => {
  return (
    <div className="relative bg-gray-100 min-h-screen">
      <Navbar />
      <OrgSignUpDetails />
    </div>
  );
};

export default OrgSignUpAdditionalPage;
