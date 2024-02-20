import { useState } from "react";
import { Listing } from "../components/Listing";
import Navbar from "../components/nav-bar"; // Import the Navbar component using relative path
import { useEffect } from "react";
import { Filters } from "../components/Filters";
import AddBtn from "../components/AddBtn";
import { listing } from "../types/types";

const HomePage = () => {
  const [listings, setListings] = useState<listing[]>([]);

  /**
   * Fetches the listings json from our backend server in order to display it to the user
   */
  useEffect(() => {
    fetch("/api/get-listings")
      .then((response) => response.json())
      .then((data) => setListings(data))
      .catch((error) => console.log("Not able to get listings", error));
  }, []);

  return (
    <>
      <div className="px-10 py-20">
        <Navbar />
        <Filters></Filters>
        {listings.length > 0 ? (
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
        ) : (
          <div className="text-center p-5 mt-5 bg-gray-100 rounded-lg shadow-md">
            <p className="text-lg text-gray-800">
              No postings are currently listed.
            </p>
          </div>
        )}
      </div>
      <AddBtn />
    </>
  );
};
export default HomePage;
