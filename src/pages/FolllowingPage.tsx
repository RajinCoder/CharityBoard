import { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";
import Navbar from "../components/nav-bar";
import { Organization } from "../components/Organization";

interface OrganizationProps {
  orgID: string;
  orgName: string;
  email: string;
  address: string;
}

const FollowingPage = () => {
  const [organizations, setOrganizations] = useState<OrganizationProps[]>([]);

  useEffect(() => {
    const getOrganizations = async () => {
      const { data, error } = await supabase.from("OrganizationTable").select();
      if (error) {
        console.log(error);
        return;
      }
      if (data) {
        setOrganizations(data);
      }
    };
    getOrganizations();
  }, []);

  return (
    <>
      <Navbar />
      <div className="px-10 py-28">
        <h1 className="text-4xl font-bold mb-8">Following</h1>
        <div className="grid grid-cols-4 gap-8">
          {organizations.map((organization) => (
            <Organization
              key={organization.orgID}
              orgID={organization.orgID}
              orgName={organization.orgName}
              email={organization.email}
              address={organization.address}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default FollowingPage;
