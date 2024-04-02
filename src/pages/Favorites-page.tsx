import { useState, useEffect } from "react";
import { supabase } from "../config/supabaseClient";
import { Filters } from "../components/Filters";
import { Listing } from "../components/Listing";
import Navbar from "../components/nav-bar";
import { listing } from "../types/types";
import { useNavigate } from "react-router-dom";

/**
 * Displays the favorite postings of the user.
 * @returns the favorite postings of the user on a page
 */
const FavoritesPage = () => {
  const [listings, setListings] = useState<listing[]>([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [filtered, setFiltered] = useState<listing[]>([]);

  useEffect(() => {
    /**
     * Fetches the favorite listings for a user from the database.
     */
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
          }
        }
      } else {
        alert("Must sign in to see favorites");
        navigate("/");
      }
    };
    getFavListing();
  }, [navigate]);

  useEffect(() => {
    const filteredListings = listings.filter((listing) => {
      const searchTermMatch = listing.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const tagsMatch = selectedFilters.every((filter) =>
        listing.tags.needs.includes(filter)
      );
      return searchTermMatch && tagsMatch;
    });

    setFiltered(filteredListings);
  }, [listings, searchTerm, selectedFilters]);

  return (
    <div className="px-10 py-20">
      <Navbar
        onSearchTermChange={(searchTerm: string) => setSearchTerm(searchTerm)}
      />
      <Filters
        selectedFilters={selectedFilters}
        onFilterChange={setSelectedFilters}
      />
      {listings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.map((listing, index) => (
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
      ) : (
        <div className="text-center p-5 mt-5 bg-gray-100 rounded-lg shadow-md">
          <p className="text-lg text-gray-800">
            No favorites are currently stored.
          </p>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
