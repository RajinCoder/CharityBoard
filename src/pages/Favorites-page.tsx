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
  user_id: string;
  tags: { needs: string[] };
  user_id: string;
}
const FavoritesPage = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  useEffect(() => {
    const getListing = async () => {
      const { data: Listing, error } = await supabase
        .from("savedtable")
        .select("list_of_listings")
        .eq(
          "user_id",
          listings.filter((val) => val.user_id)
        )
        .single();
      if (error) {
        console.log(error);
      }
      if (Listing) {
        Listing.list_of_listings.array.forEach(async (value: number) => {
          const { data, error } = await supabase
            .from("ListingTable")
            .select("*")
            .eq("listingId", value);
          if (error) {
            console.log(error);
          }
          if (data) {
            setListings(data);
            console.log(data);
          }
        });
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
          orgName={listing.name}
          orgNumber={listing.contact}
          orgLoc={listing.address}
          orgNeeds={listing.tags.needs}
          time={listing.created_at}
          listingId={listing.listingId}
          user_id={listing.user_id}
        />
      ))}
    </div>
  );
};

export default FavoritesPage;
