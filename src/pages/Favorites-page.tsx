import { useState, useEffect } from "react";
import { supabase } from "../config/supabaseClient";
import { Filters } from "../components/Filters";
import { Listing } from "../components/Listing";
import Navbar from "../components/nav-bar";
import { listing } from "../types/types";

const FavoritesPage = () => {
  const [listings, setListings] = useState<listing[]>([]);

  useEffect(() => {
    const getFavListing = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: list_of_listings, error } = await supabase
          .from("savedtable")
          .select("list_of_listings")
          .eq("user_id", user.id)
          .single();

        if (error) {
          console.log("Error fetching row", error);
        }
        if (list_of_listings) {
          const { data, error } = await supabase
            .from("ListingTable")
            .select("*")
            .in("listingId", list_of_listings.list_of_listings);

          if (error) {
            console.log("Error selecting rows");
          }
          if (data && data.length > 0) {
            setListings(data);
          } else {
            alert("No Favorites");
          }
        }
      } else {
        alert("Must sign in to see favorites");
        console.log("No user is currently signed in.");
      }
    };
    getFavListing();
  }, []);
  return (
    <div className="px-10 py-20">
      <Navbar />
      <Filters></Filters>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
  );
};

export default FavoritesPage;
