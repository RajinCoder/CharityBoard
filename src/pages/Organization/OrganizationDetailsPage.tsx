import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/nav-bar";
import { supabase } from "../../config/supabaseClient";
import { Listing } from "../../components/Listing";

interface Listing {
  listingId: number;
  created_at: string;
  name: string;
  address: string;
  contact: string;
  saved: boolean;
  tags: { needs: string[] };
  user_id: string;
}

interface OrganizationProps {
  org_uuid: string;
  orgName: string;
  email: string;
  address: string;
  mission: string;
}

const OrganizationDetailsPage = () => {
  const { uid } = useParams();
  const [listings, setListings] = useState<Listing[]>([]);
  const [organization, setOrganization] = useState<OrganizationProps | null>(
    null
  );
  const commonInfo = listings[0];

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const { data, error } = await supabase
          .from("OrganizationTable")
          .select()
          .eq("org_uuid", uid);
        if (error) {
          throw error;
        }
        if (data && data.length > 0) {
          setOrganization(data[0]);
        }
      } catch (error) {
        console.error("Error fetching organization:", error);
      }
    };

    fetchOrganization();
  }, [uid]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data, error } = await supabase
          .from("ListingTable")
          .select()
          .eq("user_id", uid);
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
  }, [uid]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="pt-28 mx-20">
        {organization && (
          <div className="mb-10">
            <h1 className="font-bold text-7xl mb-4 mt-2 text-blue-800 shadow-lg p-4 rounded-lg bg-blue-100 border border-blue-200">
              {commonInfo.name}
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
