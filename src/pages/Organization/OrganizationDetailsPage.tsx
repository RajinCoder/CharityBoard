import React, { useState, useEffect } from "react";
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

const OrganizationDetailsPage = () => {
  const { uid } = useParams();
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    const getListing = async () => {
      const { data, error } = await supabase
        .from("ListingTable")
        .select()
        .eq("user_id", uid); // Fetch only listings that match the UID
      if (error) {
        console.log(error);
      } else {
        setListings(data);
      }
    };
    getListing();
  }, [uid]);

  // Assuming the first listing contains the common info for the organization
  const commonInfo = listings[0];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="pt-20 mx-20">
        {commonInfo && (
          <div className="mb-10">
            <h1 className="font-bold text-7xl mb-4 mt-2 text-blue-800 shadow-lg p-4 rounded-lg bg-blue-100 border border-blue-200">
              {commonInfo.name}
            </h1>
          </div>
        )}
        {listings.map((listing) => (
          <Listing
            orgName={listing.name}
            orgNumber={listing.contact}
            orgLoc={listing.address}
            orgNeeds={listing.tags.needs}
            time={listing.created_at}
            uid={listing.listingId}
            user_id={listing.user_id}
          />
        ))}
      </div>
    </div>
  );
};

export default OrganizationDetailsPage;
