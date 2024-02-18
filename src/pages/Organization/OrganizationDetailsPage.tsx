import React, { useState, useEffect } from 'react';
import Navbar from '../../components/nav-bar-login';
import { supabase } from '../../config/supabaseClient';
interface Listing {
  listingId: number;
  created_at: string;
  name: string;
  address: string;
  contact: string;
  saved: boolean;
  tags: { needs: string[] };
}
const OrganizationDetailsPage = () => {
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
    <div>
      <Navbar />
      {/* Add a div with a class or style that adds padding to the top. Adjust the px value as needed. */}
      <div style={{ paddingTop: '100px', marginLeft: '20px' }}>
        {listings.map((listing, index) => (
          <div key={index}>
            <h3>{listing.name}</h3>
            <p>Contact: {listing.contact}</p>
            <p>Location: {listing.address}</p>
            <p>Need: {listing.tags.needs.join(', ')}</p>
            <p>Last updated {listing.created_at}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default OrganizationDetailsPage;