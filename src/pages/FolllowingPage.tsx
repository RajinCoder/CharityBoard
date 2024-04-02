import { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";
import Navbar from "../components/nav-bar";
import { OrganizationListing } from "../components/Organization";
import { useNavigate } from "react-router-dom";
import { orginization } from "../types/types";

/**
 * Returns the following page of the user.
 * @returns a page displaying the orginizations the user follows.
 */
const FollowingPage = () => {
  const [organizations, setOrganizations] = useState<orginization[]>([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    /**
     * Gets the orginizations that the user follows.
     * @returns the orginizations returned by the database query
     */
    const getOrganizations = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        console.log(user.id);
        const { data: list_of_followings, error } = await supabase
          .from("followingtable")
          .select("list_of_followings")
          .eq("user_id", user.id)
          .single();

        if (error) {
          console.log("Error fetching row", error);
        }
        if (list_of_followings) {
          const { data, error } = await supabase
            .from("OrganizationTable")
            .select("*")
            .in("org_uuid", list_of_followings.list_of_followings);

          if (error) {
            console.log("Error selecting rows");
          }
          if (data && data.length > 0) {
            setOrganizations(data);
          }
        }
      } else {
        alert("Must sign in to see followings");
        navigate("/");
      }
    };
    getOrganizations();
  }, [navigate]);

  return (
    <>
      <Navbar
        onSearchTermChange={(searchTerm: string) => setSearchTerm(searchTerm)}
      />
      <div className="px-10 py-28">
        <h1 className="text-4xl font-bold mb-8">Following</h1>
        {organizations.length > 0 ? (
          <div className="grid grid-cols-4 gap-8">
            {organizations
              .filter((listing) =>
                listing.orgname.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((organization) => (
                <OrganizationListing
                  key={organization.org_uuid}
                  uuid={organization.org_uuid}
                  orgName={organization.orgname}
                  email={organization.email}
                  address={organization.address}
                />
              ))}
          </div>
        ) : (
          <div className="text-center p-5 mt-5 bg-gray-100 rounded-lg shadow-md">
            <p className="text-lg text-gray-800">Nobody followed.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default FollowingPage;
