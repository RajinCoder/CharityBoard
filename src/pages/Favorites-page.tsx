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
  user_id: string;
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
        const savedListings = data.filter((listing) => listing.saved);
        setListings(savedListings);
        console.log(savedListings);
      }
    };
    getListing();
  }, []);
  return (
    <div className="px-10 py-20">
      <Navbar />
      <Filters></Filters>
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
  );
};

export default FavoritesPage;
