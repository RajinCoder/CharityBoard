import { useState, useEffect } from "react";
import { supabase } from "../config/supabaseClient";
import { Filters } from "../components/Filters";
import { Listing } from "../components/Listing";
import Navbar from "../components/nav-bar";

interface Listing {
  listingId: number;
  created_at: string;
  name: string;
  address: string;
  contact: string;
  saved: boolean;
  tags: { needs: string[] };
}
const FavoritesPage = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  useEffect(() => {
    const getListing = async () => {
      const { data, error } = await supabase.from("ListingTable").select();
      if (error) {
        console.log(error);
      }
      if (data) {
        const savedListings = data.filter(listing => listing.saved);
        setListings(savedListings);
        console.log(savedListings);
      }
    };
    getListing();
  }, []);
  return (
    <div className="h-100 p-10">
      <Navbar />
      <Filters></Filters>
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

export default FavoritesPage


