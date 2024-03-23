import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/nav-bar-login";
import { supabase } from "../../config/supabaseClient";
import { Listing } from "../../components/Listing";
import { listing, orginization } from "../../types/types";
import FollowingBtn from "../../components/FollowingBtn";

/**
 * Renders an orginization's page.
 * @returns
 */
const OrganizationDetailsPage = () => {
  const location = useLocation();
  const [listings, setListings] = useState<listing[]>([]);
  const [organization, setOrganization] = useState<orginization | null>(null);
  const org_uuid = location.state.owner_id;

  useEffect(() => {
    /**
     * Fetches the data of the organization clicked on.
     */
    const fetchOrganization = async () => {
      try {
        const { data, error } = await supabase
          .from("OrganizationTable")
          .select()
          .eq("org_uuid", org_uuid)
          .single();

        if (error) {
          throw error;
        }
        if (data) {
          setOrganization(data);
        }
      } catch (error) {
        console.error("Error fetching organization:", error);
      }
    };

    fetchOrganization();
  }, [org_uuid]);

  useEffect(() => {
    /**
     * Fetches the listings of an organization.
     */
    const fetchListings = async () => {
      try {
        const { data, error } = await supabase
          .from("ListingTable")
          .select()
          .eq("user_id", org_uuid);
        if (error) {
          throw error;
        }
        if (data) {
          setListings(data);
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, [org_uuid]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-28 mx-20">
        {organization && (
          <div className="mb-2 shadow-lg p-4 rounded-lg bg-black-300 border border-blue-700">
            <div className="flex justify-between">
              <h1 className="text-7xl mb-4 mt-2 text-gray-800">
                {organization.orgname}
              </h1>
              <FollowingBtn org_uuid={organization.org_uuid} />
            </div>
            <h3>
              Mission Statement: "Helping the world feel better by doing our
              part!"
            </h3>
          </div>
        )}
        <div className="flex flex-wrap gap-4 shadow-lg p-4 rounded-lg bg-black-300 border border-blue-700">
          {listings.map((listing, index) => (
            <Listing
              key={index}
              name={listing.name}
              contact={listing.contact}
              address={listing.address}
              tags={listing.tags}
              created_at={listing.created_at}
              listingId={listing.listingId}
              user_id={listing.user_id}
              saved={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrganizationDetailsPage;
