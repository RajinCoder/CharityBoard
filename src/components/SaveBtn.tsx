import { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";
import starBlue from "../assets/starBlue.svg";
import starYellow from "../assets/starYellow.svg";

interface Props {
  listingId: number;
}

/**
 * Stores a certain listing as a favorite for a certain user.
 * Invariant: Organizations should be able to favorite their listings
 * @param param0 the listingId of the listing the button is apart of
 * @returns
 */
const SaveBtn = ({ listingId }: Props) => {
  const [isSaved, setIsSaved] = useState(false);
  const [user_id, setUserId] = useState<string | null>(null);

  /**
   * Toggles the saved status of a listing.
   * @returns
   */
  const toggleSave = async () => {
    try {
      const { data, error } = await supabase
        .from("savedtable")
        .select("list_of_listings")
        .eq("user_id", user_id)
        .single();

      if (error) {
        throw error;
      }

      const updatedList = isSaved
        ? data.list_of_listings.filter((id: number) => id !== listingId)
        : [...data.list_of_listings, listingId];

      const { error: updateError } = await supabase
        .from("savedtable")
        .update({ list_of_listings: updatedList })
        .eq("user_id", user_id);

      if (updateError) throw updateError;

      // Toggle the visual state without waiting for another query
      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Error toggling saved status", error);
      alert("Could not update the saved status. Please sign in.");
    }
  };

  useEffect(() => {
    /**
     * Fetches the saved status of the listing.
     */
    const fetchSavedStatus = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      } else {
        console.log("No user is currently signed in.");
      }

      // it will throw errors bc we are passing it null if not signed but it's ok for now

      try {
        const { data, error } = await supabase
          .from("savedtable")
          .select("list_of_listings")
          .eq("user_id", user_id)
          .maybeSingle(); // Use maybeSingle to handle 0 or 1 rows without throwing an error

        if (error) throw error;

        setIsSaved(data ? data.list_of_listings.includes(listingId) : false);
      } catch (error) {
        console.error("Error fetching saved status", error);
      }
    };
    fetchSavedStatus();
  }, [listingId, user_id]);

  return (
    <button onClick={toggleSave}>
      <img
        src={isSaved ? starYellow : starBlue}
        alt="Save"
        className="max-h-6"
      />
    </button>
  );
};

export default SaveBtn;
