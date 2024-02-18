import { useState } from "react";
import { Listing } from "../components/Listing";
import Navbar from "../components/nav-bar"; // Import the Navbar component using relative path
import { useEffect } from "react";
import { supabase } from "../config/supabaseClient";

interface Listing {
  listingId: number;
  created_at: string;
  name: string;
  address: string;
  contact: string;
  saved: boolean;
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
    <div className="h-100 p-10">
      <Navbar />
      {listings.map((listing, index) => (
        <Listing
          key={index}
          orgName={listing.name}
          orgNumber={listing.contact}
          orgLoc={listing.address}
          orgNeeds={listing.tags.needs}
          time={listing.created_at}
          uid={listing.listingId}
        />
      ))}
    </div>
  );
};

export default HomePage;
