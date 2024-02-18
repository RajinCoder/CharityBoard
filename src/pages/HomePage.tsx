import { useState } from "react";
import { Listing } from "../components/Listing";
import Navbar from "../components/nav-bar"; // Import the Navbar component using relative path
import { useEffect } from "react";
import { supabase } from "../config/supabaseClient";
import { Filters } from "../components/Filters";

interface Listing {
  listingId: number;
  created_at: string;
  name: string;
  address: string;
  contact: string;
  saved: boolean;
  user_id: string;
  tags: { needs: string[] };
}
const HomePage = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  useEffect(() => {
    const getListing = async () => {
      const { data, error } = await supabase.from("ListingTable").select();
      if (error) {
        console.log(error);
      }
      if (data) {
        setListings(data);
        console.log(data);
      }
    };

    getListing();
  }, []);
  return (
    <div className="px-10 py-20">
      <Navbar />
      <Filters></Filters>
      <div className="grid grid-cols-4 gap-8">
        {listings.map((listing, index) => (
          <Listing
            key={index}
            orgName={listing.name}
            orgNumber={listing.contact}
            orgLoc={listing.address}
            orgNeeds={listing.tags.needs}
            time={listing.created_at}
            user_id={listing.user_id}
            listingId={listing.listingId}
          />
        ))}
      </div>
    </div>
  );
};
export default HomePage;
