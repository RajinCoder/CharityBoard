import { useState, useEffect } from "react";
import Navbar from "../../components/nav-bar-login";
import { supabase } from "../../config/supabaseClient";
import { useParams } from 'react-router-dom';

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
      const { data, error } = await supabase.from("ListingTable").select();
      if (error) {
        console.log(error);
      }
      if (data) {
        setListings(data);
      }
    };
    getListing();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="pt-20 mx-20">
        {listings.filter(listing => listing.user_id === uid).map((listing) => (
          <div key={listing.listingId} className="max-w-xl mx-auto mb-10 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{listing.name}</div>
              <p className="text-gray-700 text-base">
                Contact: <span className="font-semibold">{listing.contact}</span>
              </p>
              <p className="text-gray-700 text-base">
                Location: <span className="font-semibold">{listing.address}</span>
              </p>
              <p className="text-gray-700 text-base">
                Need: <span className="font-semibold">{listing.tags.needs.join(", ")}</span>
              </p>
              <p className="text-gray-700 text-base">
                Last updated: <span className="font-semibold">{listing.created_at}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizationDetailsPage;
