import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/nav-bar";
import { supabase } from "../../config/supabaseClient";
import { Listing } from "../../components/Listing";
import { listing, orginization } from "../../types/types";

const OrganizationDetailsPage = () => {
  const location = useLocation();
  const [listings, setListings] = useState<listing[]>([]);
  const [organization, setOrganization] = useState<orginization | null>(null);
  const org_uuid = location.state.owner_id;

  useEffect(() => {
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
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="pt-28 mx-20">
        {organization && (
          <div className="mb-10">
            <h1 className="font-bold text-7xl mb-4 mt-2 text-blue-800 shadow-lg p-4 rounded-lg bg-blue-100 border border-blue-200">
              {organization.orgname}
            </h1>
          </div>
        )}
        <div className="flex flex-wrap gap-4">
          {listings.map((listing, index) => (
            <div key={listing.listingId} className=" p-4 flex flex-col">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrganizationDetailsPage;
